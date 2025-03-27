'use client'
import { useMemo } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Input } from '@/common/components/Input'
import { Textarea } from '@/common/components/Textarea/Textarea'
import { Button } from '@/common/components/button'
import { profileValidationRules } from '@/features/profilePage/generalInformation/profileValidation'
import { useGetProfileQuery, usePutProfileMutation } from '@/service/profile/profile.servise'
import Image from 'next/image'

import 'react-toastify/dist/ReactToastify.css'

import styles from './generalInfo.module.scss'

import DefaultImage from '../../../../public/images/DefaultImage.jpg'

export type ProfileType = {
  aboutMe?: string
  city?: string
  country?: string
  dateOfBirth?: string
  firstName?: string
  lastName?: string
  profileId: number
  userName?: string
}
export const GeneralInfo = ({ profileId }: ProfileType) => {
  const { data: profile } = useGetProfileQuery(profileId)
  const [putProfile, { error: putError, isLoading: isPutLoading }] = usePutProfileMutation()
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setError,
  } = useForm<ProfileType>({
    defaultValues: useMemo(
      () => ({
        aboutMe: profile?.aboutMe || '',
        city: profile?.city || '',
        country: profile?.country || '',
        dateOfBirth: profile?.dateOfBirth || '',
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        userName: profile?.userName || '',
      }),
      [profile]
    ),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const onSubmit: SubmitHandler<ProfileType> = async body => {
    // Preserve existing aboutMe if cleared
    if (profile?.aboutMe && !body.aboutMe) {
      body.aboutMe = ' '
    }

    // Use existing dateOfBirth if not provided
    body.dateOfBirth = body.dateOfBirth || profile?.dateOfBirth

    try {
      await putProfile({ body }).unwrap()
      toast.success('Profile updated successfully!')
    } catch (error) {
      if (putError) {
        setError('userName', {
          message: 'Username already exists',
          type: 'server',
        })
        toast.error('Username already exists')
      } else {
        toast.error('Failed to update profile')
        console.error('Profile update error:', error)
      }
    }
  }
  const validationRules = profileValidationRules

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.avatarContainer}>
          <Image
            alt={'avatar'}
            className={styles.avatarImage}
            height={192}
            src={DefaultImage}
            width={192}
          />
          <Button variant={'primary'}> add photo</Button>
        </div>
        <div>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <Controller<ProfileType>
              control={control}
              name={'userName'}
              render={({ field, fieldState }) => (
                <Input
                  className={styles.inputField}
                  errorMessage={fieldState.error?.message}
                  label={'Username'}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  propsClassName={styles.asterik}
                  type={'text'}
                  value={field.value}
                />
              )}
              rules={{
                maxLength: {
                  message: 'Maximum 30 characters',
                  value: 30,
                },
                minLength: {
                  message: 'Minimum 6 characters',
                  value: 6,
                },
                pattern: {
                  message: 'Only letters, numbers, _ and -',
                  value: /^[a-zA-Z0-9_-]+$/,
                },
                required: 'Username is required',
              }}
            />

            {/* First Name */}
            <Controller<ProfileType>
              control={control}
              name={'firstName'}
              render={({ field, fieldState }) => (
                <Input
                  className={styles.inputField}
                  errorMessage={fieldState.error?.message}
                  label={'First Name'}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  propsClassName={styles.asterik}
                  type={'text'}
                  value={field.value}
                />
              )}
              rules={{
                maxLength: {
                  message: 'Maximum 50 characters',
                  value: 50,
                },
                minLength: {
                  message: 'Minimum 1 character',
                  value: 1,
                },
                pattern: {
                  message: 'Only letters (Latin or Cyrillic)',
                  value: /^[a-zA-Zа-яА-Я]+$/,
                },
                required: 'This field is required',
              }}
            />

            {/* Last Name */}
            <Controller<ProfileType>
              control={control}
              name={'lastName'}
              render={({ field, fieldState }) => (
                <Input
                  className={styles.inputField}
                  errorMessage={fieldState.error?.message}
                  label={'Last Name'}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  propsClassName={styles.asterik}
                  type={'text'}
                  value={field.value}
                />
              )}
              rules={{
                maxLength: {
                  message: 'Maximum 50 characters',
                  value: 50,
                },
                minLength: {
                  message: 'Minimum 1 character',
                  value: 1,
                },
                pattern: {
                  message: 'Only letters (Latin or Cyrillic)',
                  value: /^[a-zA-Zа-яА-Я]+$/,
                },
                required: 'This field is required',
              }}
            />

            {/* Date of Birth */}
            <Controller
              control={control}
              name={'dateOfBirth'}
              render={({ field, fieldState }) => (
                <div className={styles.formGroup}>
                  {' '}
                  <label className={styles.label}> Date of Birth</label>
                  <input
                    type={'date'}
                    {...field}
                    className={`${styles.inputField} ${styles.dateInput}`}
                    style={{ width: '100%' }}
                  />
                  {fieldState.error && (
                    <p className={styles.errorMessage}>{fieldState.error.message}</p>
                  )}
                </div>
              )}
              rules={validationRules.dateOfBirth}
            />
            <div className={styles.CountryAndCity}>
              {/* City */}
              <Controller
                control={control}
                name={'country'}
                render={({ field }) => (
                  <div>
                    <label className={styles.label}>Country</label>
                    <input type={'text'} {...field} className={styles.inputFielder} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name={'city'}
                render={({ field }) => (
                  <div>
                    <label className={styles.label}>City</label>
                    <input type={'text'} {...field} className={styles.inputFielder} />
                  </div>
                )}
              />
            </div>
            {/* About Me */}
            <Controller
              control={control}
              name={'aboutMe'}
              render={({ field, fieldState }) => (
                <Textarea
                  errorMessage={fieldState.error?.message}
                  label={'About me'}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
              rules={validationRules.aboutMe}
            />

            <div className={styles.submitContainer}>
              <Button className={styles.button} disabled={!isValid} type={'submit'}>
                {isPutLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GeneralInfo
