'use client'

import { useEffect } from 'react'

import { storage } from '@/common/utils/storage'
import { useGoogleLoginMutation } from '@/service/auth'
import { useRouter, useSearchParams } from 'next/navigation'

import '@/styles/index.scss'

export default function Home() {
  const router = useRouter()
  const params = useSearchParams()
  const code = params.get('code')
  const [googleLogin] = useGoogleLoginMutation()

  useEffect(() => {
    const token = storage.getToken()

    if (code) {
      googleLogin({ code })
        .unwrap()
        .then(res => {
          storage.setToken(res.accessToken)
          router.replace('/createAccount')
        })
        .catch(error => console.error('Google Login Error:', error))
    }

    if (token && !code) {
      return router.replace('/createAccount')
    } else if (!token && !code) {
      return router.replace(`/auth/signIn`)
    }
  }, [code, googleLogin, router])

  /*   if (isLoading) {
    return <h1>Loading...</h1>
  } */

  return null
}
