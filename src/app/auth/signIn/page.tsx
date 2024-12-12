'use client'

import { useEffect, useState } from 'react'

import { useAppSelector } from '@/common/hooks/useAppSelector'
import { storage } from '@/common/utils/storage'
import { SignIn as SignInCard } from '@/features/auth/ui/signIn'
import { useLogInMutation } from '@/service/auth'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { replace } = useRouter()
  const [login] = useLogInMutation()
  const auth = useAppSelector(state => state.auth)

  console.log('authSignIn', auth)
  const [isError, setIsError] = useState()

  useEffect(() => {
    if (auth.userId) {
      return replace(`/profile/${auth.userId}`)
    }
  }, [auth.userId, replace])

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const userData = await login(data).unwrap()

      storage.setToken(userData.accessToken)
      replace(`/profile/${auth.userId}`)
      // const meRes = await getMe()
      // const userId = meRes?.data?.userId

      // replace(`/profile/${userId}`)

      //TODO: Типизация ошибки
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsError(error.data.messages)
    }
  }

  return <SignInCard isError={isError} onSubmit={handleSignIn} />
}
