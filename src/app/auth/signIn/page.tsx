'use client'

import { useEffect, useState } from 'react'

import { storage } from '@/common/utils/storage'
import { SignIn as SignInCard } from '@/features/auth/ui/signIn'
import { useLazyMeQuery, useLogInMutation } from '@/service/auth'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { replace } = useRouter()
  const [loading, setLoading] = useState(false)
  const [login] = useLogInMutation()
  const [getMe] = useLazyMeQuery()

  // Проверяем наличие authToken в localStorage
  useEffect(() => {
    if (storage.getToken()) {
      return replace('/createAccount') // Перенаправление на страницу создания аккаунта
    }
    setLoading(false) // Если токена нет, продолжаем загрузку страницы
  }, [replace])

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const userData = await login(data).unwrap() // Вызов мутации для входа

      storage.setToken(userData.accessToken)
      const meRes = await getMe()
      const userId = meRes?.data?.userId

      replace(`/profile/${userId}`) // Перенаправление на страницу после успешного входа
    } catch (error: any) {
      error(error?.data?.message ?? 'Could not sign in') // Показываем ошибку, если вход не удался
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return <SignInCard onSubmit={handleSignIn} />
}
