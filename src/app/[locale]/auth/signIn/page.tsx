'use client'

import { useState } from 'react'

import { storage } from '@/common/utils/storage'
import { SignIn as SignInCard } from '@/features/auth/ui/signIn'
import { useRouter } from '@/i18n/navigation'
import { useLogInMutation } from '@/service/auth'

export default function SignInPage() {
  const { replace } = useRouter()
  const [login] = useLogInMutation()
  const [isError, setIsError] = useState()

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const userData = await login(data).unwrap()

      storage.setToken(userData.accessToken)

      replace(`/`)

      //TODO: Типизация ошибки
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsError(error.data.messages)
    }
  }

  return <SignInCard isError={isError} onSubmit={handleSignIn} />
}
