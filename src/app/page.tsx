'use client'

import { useEffect } from 'react'

import { storage } from '@/common/utils/storage'
import { useGoogleLoginMutation, useMeQuery } from '@/service/auth'
import { useRouter, useSearchParams } from 'next/navigation'

import '@/styles/index.scss'

export default function Home() {
  const { isLoading, refetch } = useMeQuery()
  const router = useRouter()
  const params = useSearchParams()
  const [googleLogin] = useGoogleLoginMutation()

  useEffect(() => {
    const code = params.get('code')

    if (code) {
      googleLogin({ code })
        .then(res => {
          if (res.data?.accessToken) {
            storage.setToken(res.data.accessToken)

            return refetch()
          }
        })
        .then(refetchRes => {
          if (refetchRes?.data?.userId) {
            router.push(`/profile/${refetchRes.data.userId}`)
          } else {
            router.push('/auth/signIn')
          }
        })
        .catch(error => {
          console.error('Google Login Error:', error)
        })
    }
  }, [params, googleLogin, refetch, router])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return null
}
