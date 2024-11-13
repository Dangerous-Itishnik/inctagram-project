'use client'

import { useEffect } from 'react'

import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { setCredentials } from '@/features/auth/signIn/model/authSlice'
import { selectorToken } from '@/features/auth/signIn/model/signInSelectors'
import SignIn from '@/features/auth/signIn/ui/SingIn'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  //TODO вынести useSelector
  const isAuthenticated = useAppSelector(selectorToken)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (token) {
      dispatch(setCredentials({ token }))
      router.push('/createAccount') // Перенаправление, если токен найден
    }
  }, [dispatch, router])

  return <SignIn />
}
