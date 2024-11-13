'use client'

import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/app/store/store'
import { GitHubSvg } from '@/assets/icons/github'
import { GoogleSvg } from '@/assets/icons/google'
import { Input } from '@/common/components/Input/Input'
import { AuthorizationContainer } from '@/common/components/authorizationContainer/AutoritationContainer'
import { Button } from '@/common/components/button'
import { Typography } from '@/common/components/typography'
import { useLogInMutation } from '@/features/auth/signIn/api/signInApi'
import { setCredentials } from '@/features/auth/signIn/model/authSlice'
import Link from 'next/link'

import styles from './singIn.module.scss'

export type PropsSingIn = {
  email: string
  password: string
}

export default function SignIn() {
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<PropsSingIn>({
    mode: 'onBlur',
  })
  const dispatch = useAppDispatch()
  const [login] = useLogInMutation()

  const loginHandle = async (data: PropsSingIn) => {
    try {
      const userData: { accessToken: string } = await login(data).unwrap()

      dispatch(setCredentials({ token: userData.accessToken }))
      reset()
    } catch (error) {
      console.error(error)
    }
  }

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
          loginHandle(data)
        })}
      >
        <Input
          errorMessage={errors.email?.message}
          label={'Email'}
          propsClassName={styles.input}
          {...register('email', {
            onChange: () => {
              clearErrors('email')
            },
            pattern: {
              message: 'The email must match the format example@example.com',
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            },
            required: 'This field is required',
          })}
        />
        <Input
          errorMessage={errors.password?.message}
          label={'Password'}
          propsClassName={styles.input}
          type={'password'}
          {...register('password', {
            maxLength: { message: 'Max number of characters 20', value: 20 },
            minLength: { message: 'Minimum number of characters 6', value: 6 },
            onChange: () => clearErrors('password'),
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
