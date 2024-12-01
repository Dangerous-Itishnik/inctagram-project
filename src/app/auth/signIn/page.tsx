'use client'

import { useEffect, useState } from 'react'

import { storage } from '@/common/utils/storage'
import { SignIn as SignInCard } from '@/features/auth/ui/signIn'
import { useLogInMutation } from '@/service/auth'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { replace } = useRouter()
  const [loading, setLoading] = useState(true)
  const [login] = useLogInMutation()
  // const [getMe] = useLazyMeQuery()

  useEffect(() => {
    if (storage.getToken()) {
      return replace('/createAccount')
    }
    setLoading(false)
  }, [replace])

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const userData = await login(data).unwrap()

      storage.setToken(userData.accessToken)
      replace('/createAccount')
      // const meRes = await getMe()
      // const userId = meRes?.data?.userId

      // replace(`/profile/${userId}`)
    } catch (error: any) {
      error(error?.data?.message ?? 'Could not sign in')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return <SignInCard onSubmit={handleSignIn} />
}
