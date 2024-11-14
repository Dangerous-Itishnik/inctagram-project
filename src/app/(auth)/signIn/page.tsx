'use client'

import { useEffect } from 'react'

import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { setCredentials } from '@/features/auth/model/authSlice'
import SignIn from '@/features/auth/signIn/ui/SingIn'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  //TODO вынести useSelector
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (token) {
      dispatch(setCredentials({ token }))
      router.push('/createAccount')
    }
  }, [dispatch, router])

  return <SignIn />
}
