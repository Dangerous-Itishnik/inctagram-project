'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { GitHubSvg } from '@/assets/icons/github'
import { GoogleSvg } from '@/assets/icons/google'
import { Input } from '@/common/components/Input/Input'
import { AuthorizationContainer } from '@/common/components/authorizationContainer/AutoritationContainer'
import { Button } from '@/common/components/button'
import PopUp from '@/common/components/popUp/PopUp'
import { Typography } from '@/common/components/typography'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAuth } from '@/common/hooks/useAuth'
import { useLogInMutation } from '@/features/auth/api/authApi'
import { deleteCredentials, setCredentials } from '@/features/auth/model/authSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
  const { push } = useRouter()
  const [login] = useLogInMutation()
  const [authError, setAuthError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const loginHandle = async (data: PropsSingIn) => {
    try {
      const userData = await login(data).unwrap()

      dispatch(setCredentials({ token: userData.accessToken }))
      push('/createAccount')
      reset()
    } catch (error) {
      setAuthError(true)
      setErrorMessage('The email or password are incorrect. Try again please')
      dispatch(deleteCredentials())
    }
  }

  if (authError) {
    return (
      <PopUp onClose={() => setAuthError(false)} title={'Error'}>
        {errorMessage}
      </PopUp>
    )
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
