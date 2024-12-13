'use client'

import { useForm } from 'react-hook-form'

import { AuthorizationContainer } from '@/common/components/AuthorizationContainer/AutoritationContainer'
import { GoogleAuthButton } from '@/common/components/GoogleAuthButton/GoogleAuthButton'
import { Input } from '@/common/components/Input/Input'
import { Button } from '@/common/components/button'
import Link from 'next/link'

import styles from './singIn.module.scss'

import { Typography } from '../../../../common/components/Typography'

interface SignInProps {
  isError?: string
  onSubmit: (data: { email: string; password: string }) => void
}

export const SignIn = ({ isError, onSubmit }: SignInProps) => {
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<{ email: string; password: string }>(
    //Чтобы не вводить пароль и почту при тестировании
    {
      defaultValues: {
        email: '',
        password: '',
      },
    }
  )

  const customError: string =
    typeof errors.password?.message === 'string' ? errors.password.message : isError || ''

  return (
    <AuthorizationContainer>
      <Typography variant={'h1'}>Sign In</Typography>
      <div className={styles.buttonAuthorization}>
        <GoogleAuthButton />
      </div>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)} // Вызываем переданную функцию при сабмите
      >
        <Input
          errorMessage={typeof errors.email?.message === 'string' ? errors.email.message : ''}
          label={'Email'}
          propsClassName={styles.input}
          {...register('email', {
            onChange: () => clearErrors('email'),
            pattern: {
              message: 'The email must match the format example@example.com',
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            },
            required: 'This field is required',
          })}
        />
        <Input
          errorMessage={customError}
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
        <Link className={styles.forgotPassword} href={'/auth/forgot-password'}>
          Forgot Password
        </Link>
        <Button className={styles.buttonSignIn} type={'submit'}>
          Sign In
        </Button>
        <p className={styles.haveAccount}>Don’t have an account?</p>
        <Button as={Link} className={styles.buttonSignUp} href={'/auth/signUp'} variant={'link'}>
          Sign Up
        </Button>
      </form>
    </AuthorizationContainer>
  )
}
