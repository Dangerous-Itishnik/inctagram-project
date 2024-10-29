'use client'
import { useForm } from 'react-hook-form'

import { Input } from '@/common/components/Input/Input'
import { AuthorizationContainer } from '@/common/components/authorizationContainer/AutoritationContainer'
import { Button } from '@/common/components/button/Button'
import { Checkbox, Flex } from '@radix-ui/themes'
import Link from 'next/link'

import styles from './styles.module.scss'

type Props = {
  Email: string
  Password: string
  UserName: string
  confirmPassword: string
}

export default function SignUp() {
  const {
    clearErrors,
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<Props>({
    mode: 'onBlur',
  })

  const onSubmit = (data: Props) => {
    console.log(data, 'dsfsd')
    reset()
  }

  const password = watch('Password')

  return (
    <AuthorizationContainer>
      <h2 className={styles.title}>Sign Up</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={errors.UserName?.message}
          label={'UserName'}
          propsClassName={styles.input}
          {...register('UserName', {
            maxLength: { message: 'Max number of characters 30', value: 30 },
            minLength: { message: 'Minimum number of characters 6', value: 6 },
            onChange: () => {
              clearErrors('UserName')
            },
            pattern: {
              message: 'Only Latin letters',
              value: /^[A-Za-z0-9_-]+$/,
            },
            required: 'This field is required',
          })}
        />
        <Input
          errorMessage={errors.Email?.message}
          label={'Email'}
          propsClassName={styles.input}
          {...register('Email', {
            onChange: () => {
              clearErrors('Email')
            },
            pattern: {
              message: 'Please enter a valid email',
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            },
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
            onChange: () => {
              clearErrors('Password')
            },
            pattern: {
              message: 'Only Latin letters, numbers and special characters',
              value: /^[A-Za-z0-9!"#$%&'()*+,\-.:;<=>?@[\\\]^_{|}~]+$/,
            },
            required: 'This field is required',
          })}
        />
        <Input
          errorMessage={errors.confirmPassword?.message}
          label={'Password confirmation'}
          propsClassName={styles.input}
          type={'password'}
          {...register('confirmPassword', {
            onChange: () => {
              clearErrors('confirmPassword')
            },
            required: 'Password confirmation is required',
            validate: value => value === password || 'Пароли не совпадают',
          })}
        />
        <Flex align={'center'} gap={'3'} justify={'center'} mb={'5'}>
          <Checkbox color={'indigo'} defaultChecked required size={'2'} variant={'surface'} />

          <p className={styles.checkboxText}>
            I agree to the <Link href={''}>Terms of Service</Link> and{' '}
            <Link href={''}>Privacy Policy</Link>
          </p>
        </Flex>
        <Button className={styles.button} disabled={!isValid}>
          Sign Up
        </Button>
      </form>
      <p className={styles.text}>Do you have an account?</p>

      <Button as={'a'} href={'/signIn'} variant={'link'}>
        Sign In
      </Button>
    </AuthorizationContainer>
  )
}
//TODO В Input  confirmPassword неправильно работает валидация
