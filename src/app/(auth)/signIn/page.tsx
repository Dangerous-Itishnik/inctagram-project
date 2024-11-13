'use client'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store/store'
import SignIn from '@/features/auth/signIn/ui/SingIn'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  //TODO вынести useSelector
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  const router = useRouter()

  if (isAuthenticated) {
    return router.push('/createAccount')
  }

  return <SignIn />
}
