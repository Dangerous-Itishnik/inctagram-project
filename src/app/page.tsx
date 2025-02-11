'use client'

import { useEffect } from 'react'

import { TotalUsers } from '@/common/components/TotalUsers/ui/TotalUsers'
import { storage } from '@/common/utils/storage'
import { AuthUserHomePage } from '@/features/authUserHomePage'
import { useGoogleLoginMutation, useMeQuery } from '@/service/auth'
import { Spinner } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

import '@/styles/index.scss'
import { PublicPage } from '@/common/components/PablickPage/ui/PablickPage'

export default function Home() {
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
    }
  }, [code, googleLogin, router])

  return (
    <>
      {isLoading && !data && <Spinner />}
      {isError && (
        <>
          <TotalUsers />
          <PublicPage />
        </>
      )}
      {data && !isError && <AuthUserHomePage meData={data} />}
    </>
  )
}
