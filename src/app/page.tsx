'use client'

import { useEffect } from 'react'

import { storage } from '@/common/utils/storage'
import { useGoogleLoginMutation, useMeQuery } from '@/service/auth'
import { useRouter, useSearchParams } from 'next/navigation'

import '@/styles/index.scss'

export default function Home() {
  const { data, isLoading, refetch } = useMeQuery()
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
            return router.push(`/profile/${refetchRes.data.userId}`)
          }
        })
        .catch(error => {
          console.error('Google Login Error:', error)
        })
    }
    if (data && !code) {
      return router.push(`/profile/${data.userId}`)
    } else if (!data && !code) {
      return router.push(`/auth/signIn`)
    }
  }, [params, googleLogin, refetch, router, data])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return null
}
