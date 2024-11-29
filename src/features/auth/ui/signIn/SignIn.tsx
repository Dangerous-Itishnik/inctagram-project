'use client'

import { useForm } from 'react-hook-form'

import { AuthorizationContainer } from '@/common/components/AuthorizationContainer/AutoritationContainer'
import { GoogleAuthButton } from '@/common/components/GoogleAuthButton/GoogleAuthButton'
import { Input } from '@/common/components/Input/Input'
import { Button } from '@/common/components/button'

import styles from './singIn.module.scss'

import { Typography } from '../../../../common/components/Typography'

interface SignInProps {
  onSubmit: (data: { email: string; password: string }) => void // Принимаем onSubmit как пропс
}

export const SignIn = ({ onSubmit }: SignInProps) => {
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<{ email: string; password: string }>(
    //Чтобы не вводить пароль и почту при тестировании
    {
      defaultValues: {
        email: 'igorgrime@gmail.com',
        password: 'Ex4mple!',
      },
    }
  )

  return (
    <AuthorizationContainer>
      <Typography variant={'h1'}>Sign In</Typography>
      <div>
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
          errorMessage={typeof errors.password?.message === 'string' ? errors.password.message : ''}
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
        <Button type={'submit'}>Sign In</Button>
      </form>
    </AuthorizationContainer>
  )
}
