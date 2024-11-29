'use client'

import { useEffect, useState } from 'react'

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
      googleLogin({ code }).then(res => {
        console.log('storage:', res.data?.accessToken!)
        storage.setToken(res.data?.accessToken!)
        refetch().then(res => {
          console.log('userId', res.data?.userId)
          router.push(`/profile/${res.data?.userId}`)
        })
      })
    }
  }, [])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return null
}
