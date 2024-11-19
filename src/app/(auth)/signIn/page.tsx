'use client'

import { useEffect, useState } from 'react'

import { SignIn as SignInCard } from '@/features/auth/ui/signIn'
import { useLogInMutation } from '@/service/auth'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { push } = useRouter()
  const [loading, setLoading] = useState(true)
  const [login] = useLogInMutation()

  // Проверяем наличие authToken в localStorage
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      return push('/createAccount') // Перенаправление на страницу создания аккаунта
    }
    setLoading(false) // Если токена нет, продолжаем загрузку страницы
  }, [push])

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      await login(data).unwrap() // Вызов мутации для входа
      push('/profile') // Перенаправление на страницу после успешного входа
    } catch (error: any) {
      error(error?.data?.message ?? 'Could not sign in') // Показываем ошибку, если вход не удался
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return <SignInCard onSubmit={handleSignIn} />
}
