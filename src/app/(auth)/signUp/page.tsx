'use client'
import { useForm } from 'react-hook-form'

import { Input } from '@/common/components/Input/Input'
import { AuthorizationContainer } from '@/common/components/authorizationContainer/AutoritationContainer'
import { Button } from '@/common/components/button/Button'

import styles from './styles.module.scss'
type Props = {
  Email: string
  Password: string
  UserName: string
}

export default function SignUp() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Props>()

  const onSubmit = (data: Props) => {
    console.log('Submitted data:', data)
    console.log(errors)
  }

  return (
    <AuthorizationContainer>
      <h2 className={styles.title}>Sign Up</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={errors.UserName?.message}
          label={'UserName'}
          propsClassName={styles.input}
          {...register('UserName', {
            //TODO бага с maxLength что бы работало надо поставить ниже minLength. При сохранении происходит изменение
            maxLength: { message: 'Максимум 30 символов', value: 30 },
            minLength: { message: 'Минимум 6 символа', value: 6 },
            pattern: {
              message: 'Только латинские буквы',
              value: /^[A-Za-z0-9_-]+$/,
            },
            required: 'Поле обязательно для заполнения',
          })}
        />
        <Input
          errorMessage={errors.Email?.message}
          label={'Email'}
          propsClassName={styles.input}
          {...register('Email', {
            pattern: {
              message: 'Введите корректный email',
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            },
            required: 'Поле обязательно для заполнения',
          })}
        />
        <Input
          errorMessage={errors.Password?.message}
          label={'Password'}
          propsClassName={styles.input}
          {...register('Password', {
            //TODO бага с maxLength что бы работало надо поставить ниже minLength. При сохранении происходит изменение
            maxLength: { message: 'Максимум 20 символов', value: 20 },
            minLength: { message: 'Минимум 6 символа', value: 6 },
            pattern: {
              message: 'Только латинские буквы, цифры и специальные символы',
              value: /^[A-Za-z0-9!"#$%&'()*+,\-.:;<=>?@[\\\]^_{|}~]+$/,
            },
            required: 'Поле обязательно для заполнения',
          })}
        />

        <button type={'submit'}>Отправить</button>
        <Button>Sign Up</Button>
      </form>
    </AuthorizationContainer>
  )
}
//TODO сделать кнопку правильно //TODO Доделать валидацию
