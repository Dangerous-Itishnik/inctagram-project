'use client'
import { useForm } from 'react-hook-form'

import { Input } from '@/common/components/Input/Input'
import { AuthorizationContainer } from '@/common/components/authorizationContainer/AutoritationContainer'
import { Button } from '@/common/components/button/Button'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectorIsAuthenticated } from '@/features/createAccount/model/useSelectorsCreateAccount'
import { Checkbox, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from './SignUp.module.scss'

export type SignUpProps = {
  Email: string
  Password: string
  UserName: string
  confirmPassword: string
}

export type OnSubmitProps = {
  onSubmit: (data: SignUpProps) => void
}

export default function SignUp({ onSubmit }: OnSubmitProps) {
  const {
    clearErrors,
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<SignUpProps>({
    mode: 'onBlur',
  })
  const router = useRouter()
  const password = watch('Password')
  const isAuthenticated = useAppSelector(selectorIsAuthenticated)

  if (isAuthenticated) {
    return router.push('/createAccount')
  }

  return (
    <AuthorizationContainer>
      <h2 className={styles.title}>Sign Up</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(data => {
          onSubmit(data)
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
              message: 'The email must match the format example@example.com',
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
              message:
                'Password must contain a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
              value:
                /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]).{8,}$/,
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
            validate: value => value === password || 'The passwords must match',
          })}
        />
        <Flex align={'center'} gap={'3'} justify={'center'} mb={'5'}>
          <Checkbox color={'indigo'} defaultChecked required size={'2'} variant={'surface'} />

          <p className={styles.checkboxText}>
            I agree to the <Link href={''}>Terms of Service</Link> and{' '}
            <Link href={''}>Privacy Policy</Link>
          </p>
        </Flex>
        <Button className={styles.button} disabled={!isValid} type={'submit'}>
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
