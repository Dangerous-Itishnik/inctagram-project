'use client'

import { useEffect, useState } from 'react'

import { storage } from '@/common/utils/storage'
import { SignIn as SignInCard } from '@/features/auth/ui/signIn'
import { useLogInMutation } from '@/service/auth'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { replace } = useRouter()
  const [login] = useLogInMutation()
  // const [getMe] = useLazyMeQuery()
  const [isError, setIsError] = useState()

  useEffect(() => {
    if (storage.getToken()) {
      return replace('/createAccount')
    }
  }, [replace])

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const userData = await login(data).unwrap()

      storage.setToken(userData.accessToken)
      replace('/createAccount')
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
