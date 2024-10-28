'use client'
import { Controller, useForm } from 'react-hook-form'

import { Input } from '@/app/components/Input/Input'
import { register } from 'next/dist/client/components/react-dev-overlay/pages/client'

import '@/styles/index.scss'

type FormValues = {
  UserName: string
}

export default function Home() {
  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log('Submitted data:', data)
    console.log(errors)
  }

  return (
    <>
      <h1>Home page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          defaultValue={''}
          name={'UserName'}
          render={({ field }) => (
            <Input
              errorMessage={errors.UserName?.message}
              label={'UserName'}
              onChangeHandler={(value: string) => {
                field.onChange(value)
                clearErrors('UserName')
              }}
              onFocus={() => clearErrors('UserName')}
              value={field.value}
            />
          )}
          rules={{
            maxLength: {
              message: 'Минимум 6 символа',
              value: 30,
            },
            minLength: {
              message: 'Минимум 6 символа',
              value: 6,
            },
            required: 'Поле обязательно для заполнения',
          }}
        />

        <button type={'submit'}>Отправить</button>
      </form>
    </>
  )
}
