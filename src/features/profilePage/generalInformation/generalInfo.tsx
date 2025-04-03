'use client'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { AvatarPhoto } from '@/common/components/AvatarPhoto/AvatarPhoto'
import { Input } from '@/common/components/Input'
import { Textarea } from '@/common/components/Textarea/Textarea'
import { Button } from '@/common/components/button'
import { useRouter } from '@/i18n/navigation'
import {
  profileApi,
  useGetProfileQuery,
  usePutProfileMutation,
} from '@/service/profile/profile.servise'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import styles from './generalInfo.module.scss'

export type ProfileType = {
  aboutMe?: string
  city?: string
  country?: string
  dateOfBirth?: string
  firstName: string
  lastName: string
  userName: string
}
type GeneralInfoProps = {
  profileId: number
}
const schema = yup.object().shape({
  aboutMe: yup.string().max(200),
  city: yup.string(),
  country: yup.string(),
  dateOfBirth: yup.string(),
  firstName: yup.string().required('First name is required').min(1).max(50),
  lastName: yup.string().required('Last name is required').min(1).max(50),
  userName: yup
    .string()
    .required('Username is required')
    .min(6)
    .max(30)
    .matches(/^[a-zA-Z0-9_-]+$/),
})

export const GeneralInfo = ({ profileId }: GeneralInfoProps) => {
  const { data: profile, isLoading: getLoading } = useGetProfileQuery(profileId)
  const [putProfile, { error: editErr, isLoading: isSubmitting }] = usePutProfileMutation()
  const { refresh } = useRouter()
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setError,
  } = useForm<ProfileType>({
    defaultValues: {
      aboutMe: profile?.aboutMe,
      city: profile?.city || '',
      country: profile?.country || '',
      dateOfBirth: profile?.dateOfBirth || '',
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      userName: profile?.userName || '',
    },
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (profile) {
      reset({
        aboutMe: profile.aboutMe || '',
        city: profile.city || '',
        country: profile.country || '',
        dateOfBirth: profile.dateOfBirth || '',
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        userName: profile.userName || '',
      })
    }
  }, [profile, reset])

  useEffect(() => {
    if (editErr) {
      toast.error('Failed to update profile')
    }
  }, [editErr])

  const onSubmit: SubmitHandler<ProfileType> = async body => {
    if (profile?.aboutMe && !body.aboutMe) {
      body.aboutMe = ' '
    }
    body.dateOfBirth = body.dateOfBirth || profile?.dateOfBirth
    try {
      await putProfile(body).unwrap()
      profileApi.util.invalidateTags(['Profile', 'Avatar'])
      refresh()
      toast.success('Profile updated successfully!', {
        autoClose: 5000,
        position: 'top-center',
      })
    } catch (error: unknown) {
      const apiError = error as {
        data?: {
          errors?: Array<{
            msg: string
            path: keyof ProfileType
          }>
        }
        status?: number
      }

      if (apiError.data?.errors) {
        // Handle validation errors
        apiError.data.errors.forEach(({ msg, path }) => {
          setError(path, {
            message: msg,
            type: 'server',
          })
        })
        toast.error('Please correct the highlighted errors')
      } else {
        // Handle other errors
        toast.error('Failed to update profile')
        console.error('Update error:', error)
      }
    }
  }

  if (getLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <AvatarPhoto profileId={profileId} />
      </div>
      <div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <Controller
            control={control}
            // eslint-disable-next-line react/jsx-curly-brace-presence
            name="userName"
            render={({ field, fieldState }) => (
              <Input
                className={styles.inputField}
                errorMessage={fieldState.error?.message}
                label={'Username'}
                onBlur={field.onBlur}
                onChange={field.onChange}
                propsClassName={styles.asterik}
                type={'text'}
                value={field.value || ''}
              />
            )}
          />
          {/* First Name */}
          <Controller
            control={control}
            // eslint-disable-next-line react/jsx-curly-brace-presence
            name="firstName"
            render={({ field, fieldState }) => (
              <Input
                className={styles.inputField}
                errorMessage={fieldState.error?.message}
                label={'Firstname'}
                onBlur={field.onBlur}
                onChange={field.onChange}
                propsClassName={styles.asterik}
                type={'text'}
                value={field.value || ''}
              />
            )}
          />
          {/* Last Name */}
          <Controller
            control={control}
            // eslint-disable-next-line react/jsx-curly-brace-presence
            name="lastName"
            render={({ field, fieldState }) => (
              <Input
                className={styles.inputField}
                errorMessage={fieldState.error?.message}
                label={'Lastname'}
                onBlur={field.onBlur}
                onChange={field.onChange}
                propsClassName={styles.asterik}
                type={'text'}
                value={field.value || ''}
              />
            )}
          />
          {/* Date of Birth */}
          <Controller
            control={control}
            // eslint-disable-next-line react/jsx-curly-brace-presence
            name="dateOfBirth"
            render={({ field, fieldState }) => (
              <div className={styles.formGroup}>
                <label className={styles.label}>Date of Birth</label>
                <input
                  onChange={e => {
                    // Convert date picker format to dd.mm.yyyy
                    const selectedDate = e.currentTarget.value

                    if (selectedDate) {
                      const [year, month, day] = selectedDate.split('-')

                      field.onChange(`${day}.${month}.${year}`)
                    }
                  }}
                  style={{ background: '#171717' }}
                  type={'date'}
                  value={field.value}
                />
                {fieldState.error && (
                  <p className={styles.errorMessage}>{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
          <div className={styles.CountryAndCity}>
            {/* Country */}
            <Controller
              control={control}
              // eslint-disable-next-line react/jsx-curly-brace-presence
              name="country"
              render={({ field }) => (
                <div>
                  <label className={styles.label}>Country</label>
                  <input
                    type={'text'}
                    {...field}
                    className={styles.inputFielder}
                    value={field.value || ''}
                  />
                </div>
              )}
            />
            {/* City */}
            <Controller
              control={control}
              // eslint-disable-next-line react/jsx-curly-brace-presence
              name="city"
              render={({ field }) => (
                <div>
                  <label className={styles.label}>City</label>
                  <input
                    type={'text'}
                    {...field}
                    className={styles.inputFielder}
                    value={field.value || ''}
                  />
                </div>
              )}
            />
          </div>
          {/* About Me */}
          <Controller
            control={control}
            // eslint-disable-next-line react/jsx-curly-brace-presence
            name="aboutMe"
            render={({ field, fieldState }) => (
              <Textarea
                errorMessage={fieldState.error?.message}
                label={'About Me'}
                maxLength={200}
                onBlur={field.onBlur}
                onChange={field.onChange}
                rows={4}
                value={field.value || ''}
              />
            )}
          />
          <div className={styles.submitContainer}>
            <Button
              className={styles.button}
              disabled={!isValid || Object.keys(errors).length > 0}
              type={'submit'}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default GeneralInfo
