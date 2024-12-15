'use client'

import { useEffect } from 'react'

import { storage } from '@/common/utils/storage'
import { AuthUserPage } from '@/features/authUserPage'
import { useGoogleLoginMutation, useMeQuery } from '@/service/auth'
import { Spinner } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

import '@/styles/index.scss'

export default function Home() {
  const router = useRouter()
  const params = useSearchParams()
  const code = params.get('code')
  const [googleLogin] = useGoogleLoginMutation()
  const { data, isFetching, isLoading, isSuccess } = useMeQuery()

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
    }
  }, [code, googleLogin, router])

  if (isLoading || isFetching) {
    return <Spinner />
  }
  if (isSuccess) {
    return <AuthUserPage meData={data} />
  }

  return <p>aaa</p>
}
