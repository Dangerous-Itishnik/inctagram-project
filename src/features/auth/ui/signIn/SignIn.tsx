'use client'

import { useForm } from 'react-hook-form'

import { AuthorizationContainer } from '@/common/components/AuthorizationContainer/AutoritationContainer'
import { GoogleAuthButton } from '@/common/components/GoogleAuthButton/GoogleAuthButton'
import { Input } from '@/common/components/Input/Input'
import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

import styles from './singIn.module.scss'

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
        email: 'igorgrime@gmail.com',
        password: 'Ex4mple!',
      },
    }
  )
  const t = useTranslations('auth')
  const tValidate = useTranslations('auth')
  const customError: string =
    typeof errors.password?.message === 'string' ? errors.password.message : isError || ''

  return (
    <AuthorizationContainer>
      <Typography variant={'h1'}>{t('signIn')}</Typography>
      <div className={styles.buttonAuthorization}>
        <GoogleAuthButton />
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={typeof errors.email?.message === 'string' ? errors.email.message : ''}
          label={t('email')}
          propsClassName={styles.input}
          {...register('email', {
            onChange: () => clearErrors('email'),
            pattern: {
              message: tValidate('emailError'),
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            },
            required: tValidate('required'),
          })}
        />
        <Input
          errorMessage={customError}
          label={t('password')}
          propsClassName={styles.input}
          type={'password'}
          {...register('password', {
            maxLength: { message: tValidate('maxCharacters', { count: 20 }), value: 20 },
            minLength: { message: tValidate('maxCharacters', { count: 6 }), value: 6 },
            onChange: () => clearErrors('password'),
            pattern: {
              message: tValidate('passwordError'),
              value: /^[A-Za-z0-9!"#$%&'()*+,\-.:;<=>?@[\\\]^_{|}~]+$/,
            },
            required: tValidate('required'),
          })}
          autoComplete={'off'}
        />
        <Link className={styles.forgotPassword} href={'/auth/forgot-password'}>
          {t('forgotPassword')}
        </Link>
        <Button className={styles.buttonSignIn} type={'submit'}>
          {t('signIn')}
        </Button>
        <p className={styles.haveAccount}>{t('dontHaveAccount')}</p>
        <Button variant={'link'}>
          <Link href={'/auth/signUp'}>{t('signUp')}</Link>
        </Button>
      </form>
    </AuthorizationContainer>
  )
}
