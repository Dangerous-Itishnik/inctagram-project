'use client'
import { useMemo } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Input } from '@/common/components/Input'
import { Textarea } from '@/common/components/Textarea/Textarea'
import { Button } from '@/common/components/button'
import { profileValidationRules } from '@/features/profilePage/generalInformation/profileValidation'
import { ProfilePut } from '@/service/profile/profile'
import { useGetProfileQuery, usePutProfileMutation } from '@/service/profile/profile.servise'
import Image from 'next/image'

import 'react-toastify/dist/ReactToastify.css'

import styles from './generalInfo.module.scss'

import DefaultImage from '../../../../public/images/DefaultImage.jpg'

type ProfileType = {
  aboutMe?: string
  city?: string
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
  } = useForm<ProfilePut>({
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

  const onSubmit: SubmitHandler<ProfilePut> = async body => {
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
            <Controller
              control={control}
              name={'userName'}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  className={styles.inputField}
                  errorMessage={fieldState.error?.message}
                  label={'Username'}
                  propsClassName={styles.asterik}
                  type={'text'}
                />
              )}
              rules={validationRules.userName}
            />

            {/* First Name */}
            <Controller
              control={control}
              name={'firstName'}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  className={styles.inputField}
                  errorMessage={fieldState.error?.message}
                  label={'First Name'}
                  propsClassName={styles.asterik}
                  type={'text'}
                />
              )}
              rules={validationRules.name}
            />

            {/* Last Name */}
            <Controller
              control={control}
              name={'lastName'}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  className={styles.inputField}
                  errorMessage={fieldState.error?.message}
                  label={'Last Name'}
                  propsClassName={styles.asterik}
                  type={'text'}
                />
              )}
              rules={validationRules.name}
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
                <Textarea {...field} errorMessage={fieldState.error?.message} label={'About me'} />
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
