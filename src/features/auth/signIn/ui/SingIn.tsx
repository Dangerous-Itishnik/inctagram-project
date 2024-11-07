'use client'

import { useForm } from 'react-hook-form'

import { GitHubSvg } from '@/assets/icons/github'
import { GoogleSvg } from '@/assets/icons/google'
import { Input } from '@/common/components/Input/Input'
import { AuthorizationContainer } from '@/common/components/authorizationContainer/AutoritationContainer'
import { Button } from '@/common/components/button'
import { Typography } from '@/common/components/typography'
import Link from 'next/link'

import styles from './singIn.module.scss'

export type PropsSingIn = {
  Password: string
  UserName: string
}

export type SignInProps = {
  onSubmit: (data: PropsSingIn) => void
}

export default function SignIn({ onSubmit }: SignInProps) {
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<PropsSingIn>({
    mode: 'onBlur',
  })

  return (
    <AuthorizationContainer>
      <Typography variant={'h1'}>Sign In</Typography>
      <div className={styles.auth_icons}>
        <Button variant={'link'}>
          <GoogleSvg />
        </Button>
        <Button variant={'link'}>
          <GitHubSvg />
        </Button>
      </div>
      <form
        className={styles.form}
        onSubmit={handleSubmit(data => {
          console.log('handleSubmit')
          onSubmit?.(data)
          reset()
        })}
      >
        <Input
          errorMessage={errors.UserName?.message}
          label={'UserName'}
          propsClassName={styles.input}
          {...register('UserName', {
            maxLength: { message: 'Max number of characters 30', value: 30 },
            minLength: { message: 'Minimum number of characters 6', value: 6 },
            onChange: () => clearErrors('UserName'),
            pattern: { message: 'Only Latin letters', value: /^[A-Za-z0-9_-]+$/ },
            required: 'This field is required',
          })}
        />
        <Input
          errorMessage={errors.Password?.message}
          label={'Password'}
          propsClassName={styles.input}
          type={'password'}
          {...register('Password', {
            maxLength: { message: 'Max number of characters 20', value: 20 },
            minLength: { message: 'Minimum number of characters 6', value: 6 },
            onChange: () => clearErrors('Password'),
            pattern: {
              message: 'Only Latin letters, numbers and special characters',
              value: /^[A-Za-z0-9!"#$%&'()*+,\-.:;<=>?@[\\\]^_{|}~]+$/,
            },
            required: 'This field is required',
          })}
          autoComplete={'off'}
        />
        <div className={styles.container}>
          <div className={styles.linkContainer}>
            <Typography as={Link} href={'/forgot-password'} variant={'body2'}>
              Forgot Password
            </Typography>
          </div>
          <Button type={'submit'}>Sign In</Button>
          <div className={styles.centerTextContainer}>
            <Typography variant={'body2'}>Don&apos;t have an account?</Typography>
            <Button as={Link} href={'/signUp'} variant={'link'}>
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </AuthorizationContainer>
  )
}
