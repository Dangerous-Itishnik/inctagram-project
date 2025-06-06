import { useForm } from 'react-hook-form'

import { AuthorizationContainer } from '@/common/components/AuthorizationContainer/AutoritationContainer'
import { Input } from '@/common/components/Input/Input'
import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button/Button'
import { FormCheckbox } from '@/common/components/formComponents/formCheckbox'
import { Link } from '@/i18n/navigation'
import { Message } from '@/service/auth/auth.types'
import { Flex } from '@radix-ui/themes'

import styles from './SignUp.module.scss'

export type SignUpProps = {
  Email: string
  Password: string
  UserName: string
  confirmPassword: string
  termsAccepted: boolean
}

type OnSubmitProps = {
  clearEmailAndUserNameError: () => void
  onSubmit: (data: SignUpProps) => void
  onSubmitError: Message
}

const USERNAME_MIN_LENGTH = 6
const USERNAME_MAX_LENGTH = 30
const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 20

const USERNAME_PATTERN = /^[A-Za-z0-9_-]+$/
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PASSWORD_PATTERN =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]).{8,}$/

const USERNAME_ERROR_MESSAGES = {
  maxLength: `Max number of characters ${USERNAME_MAX_LENGTH}`,
  minLength: `Minimum number of characters ${USERNAME_MIN_LENGTH}`,
  pattern: 'Only Latin letters',
  required: 'This field is required',
}

const EMAIL_ERROR_MESSAGES = {
  pattern: 'The email must match the format example@example.com',
  required: 'This field is required',
}

const PASSWORD_ERROR_MESSAGES = {
  maxLength: `Max number of characters ${PASSWORD_MAX_LENGTH}`,
  minLength: `Minimum number of characters ${PASSWORD_MIN_LENGTH}`,
  pattern:
    'Password must contain a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
  required: 'This field is required',
}

const CONFIRM_PASSWORD_ERROR_MESSAGES = {
  required: 'Password confirmation is required',
  validate: 'The passwords must match',
}

export function SignUp({ clearEmailAndUserNameError, onSubmit, onSubmitError }: OnSubmitProps) {
  const {
    clearErrors,
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<SignUpProps>({
    mode: 'onBlur',
  })
  const password = watch('Password')
  const termsAccepted = watch('termsAccepted', false)

  const handleClearErrors = (fieldName: keyof SignUpProps) => {
    clearErrors(fieldName)
    if (fieldName === 'Email' || fieldName === 'UserName') {
      clearEmailAndUserNameError()
    }
  }

  return (
    <AuthorizationContainer>
      <Typography variant={'h1'}>Sign Up</Typography>
      <form
        className={styles.form}
        onSubmit={handleSubmit(async data => {
          await onSubmit(data)
          reset()
        })}
      >
        <Input
          errorMessage={
            errors.UserName?.message ||
            (onSubmitError.field === 'userName' ? onSubmitError.message : '')
          }
          label={'UserName'}
          propsClassName={styles.input}
          {...register('UserName', {
            maxLength: { message: USERNAME_ERROR_MESSAGES.maxLength, value: USERNAME_MAX_LENGTH },
            minLength: { message: USERNAME_ERROR_MESSAGES.minLength, value: USERNAME_MIN_LENGTH },
            onChange: () => handleClearErrors('UserName'),
            pattern: { message: USERNAME_ERROR_MESSAGES.pattern, value: USERNAME_PATTERN },
            required: USERNAME_ERROR_MESSAGES.required,
          })}
        />
        <Input
          errorMessage={
            errors.Email?.message || (onSubmitError.field === 'email' ? onSubmitError.message : '')
          }
          label={'Email'}
          propsClassName={styles.input}
          {...register('Email', {
            onChange: () => handleClearErrors('Email'),
            pattern: { message: EMAIL_ERROR_MESSAGES.pattern, value: EMAIL_PATTERN },
            required: EMAIL_ERROR_MESSAGES.required,
          })}
        />
        <Input
          errorMessage={errors.Password?.message}
          label={'Password'}
          propsClassName={styles.input}
          type={'password'}
          {...register('Password', {
            maxLength: { message: PASSWORD_ERROR_MESSAGES.maxLength, value: PASSWORD_MAX_LENGTH },
            minLength: { message: PASSWORD_ERROR_MESSAGES.minLength, value: PASSWORD_MIN_LENGTH },
            onChange: () => handleClearErrors('Password'),
            pattern: { message: PASSWORD_ERROR_MESSAGES.pattern, value: PASSWORD_PATTERN },
            required: PASSWORD_ERROR_MESSAGES.required,
          })}
        />
        <Input
          errorMessage={errors.confirmPassword?.message}
          label={'Password confirmation'}
          propsClassName={styles.input}
          type={'password'}
          {...register('confirmPassword', {
            onChange: () => handleClearErrors('confirmPassword'),
            required: CONFIRM_PASSWORD_ERROR_MESSAGES.required,
            validate: value => value === password || CONFIRM_PASSWORD_ERROR_MESSAGES.validate,
          })}
        />
        <Flex align={'center'} gap={'3'} justify={'center'} mb={'5'}>
          <FormCheckbox control={control} name={'termsAccepted'} />
          <p className={styles.checkboxText}>
            I agree to the <Link href={'/termsService'}>Terms of Service</Link> and{' '}
            <Link href={'/privacyPolicy'}>Privacy Policy</Link>
          </p>
        </Flex>
        <Button
          className={styles.button}
          disabled={!isValid || !termsAccepted} // Проверяем состояние чекбокса
          type={'submit'}
        >
          Sign Up
        </Button>
      </form>
      <p className={styles.text}>Do you have an account?</p>
      <Button variant={'link'}>
        <Link href={'/auth/signIn'}>Sign In</Link>
      </Button>
    </AuthorizationContainer>
  )
}
