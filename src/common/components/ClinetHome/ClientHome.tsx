'use client'
import { useEffect } from 'react'

import { storage } from '@/common/utils/storage'
import { AuthUserHomePage } from '@/features/authUserHomePage'
import { useRouter } from '@/i18n/navigation'
import { useGoogleLoginMutation, useMeQuery } from '@/service/auth'
import { Spinner } from '@radix-ui/themes'
import { useSearchParams } from 'next/navigation'

export default function ClientHome() {
  const router = useRouter()
  const params = useSearchParams()
  const code = params.get('code')
  const [googleLogin] = useGoogleLoginMutation()
  const { data, isError, isLoading } = useMeQuery()

  useEffect(() => {
    const handleGoogleLogin = async (code: string) => {
      try {
        const res = await googleLogin({ code }).unwrap()

        storage.setToken(res.accessToken)
        router.replace('/createAccount')
      } catch (error) {
        console.error('Google Login Error:', error)
        router.replace('/auth/signIn')
      }
    }

    if (code) {
      handleGoogleLogin(code)

      return
    }
  }, [code, googleLogin, isError, router, data, isLoading])

  return (
    <>
      {isLoading && !data && <Spinner />}
      {data && !isError && <AuthUserHomePage meData={data} />}
    </>
  )
}
