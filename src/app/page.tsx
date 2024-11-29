'use client'

import { useEffect, useState } from 'react'

import { storage } from '@/common/utils/storage'
import { useGoogleLoginMutation, useMeQuery } from '@/service/auth'
import { useRouter, useSearchParams } from 'next/navigation'

import '@/styles/index.scss'

export default function Home() {
  const { data, isLoading } = useMeQuery()
  const router = useRouter()
  const params = useSearchParams()
  const [googleLogin] = useGoogleLoginMutation()

  useEffect(() => {
    const code = params.get('code')

    if (!isLoading) {
      if (data) {
        router.push(`/profile/${data.userId}`)
      } else {
        router.push('/auth/signIn')
      }
    }
    if (code) {
      googleLogin({ code }).then(res => {
        storage.setToken(res.data?.accessToken!)
        router.push(`/`)
      })
    }
  }, [data, params, isLoading, router])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return null
}
