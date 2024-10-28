'use client'
import { useForm } from 'react-hook-form'

import { Input } from '@/app/components/Input/Input'

import '@/styles/index.scss'

type FormValues = {
  Email: string
  Password: string
  UserName: string
}

export default function Home() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log('Submitted data:', data)
    console.log(errors)
  }

  return (
    <>
      <h1>Home page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={errors.UserName?.message}
          label={'UserName'}
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
          {...register('Password', {
            //TODO бага с maxLength что бы работало надо поставить ниже minLength. При сохранении происходит изменение
            maxLength: { message: 'Максимум 20 символов', value: 20 },
            minLength: { message: 'Минимум 6 символа', value: 6 },
            pattern: {
              message: 'Только латинские буквы, цифры и специальные символы',
              value: /^[A-Za-z0-9!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]+$/,
            },
            required: 'Поле обязательно для заполнения',
          })}
        />
        <button type={'submit'}>Отправить</button>
      </form>
    </>
  )
}
