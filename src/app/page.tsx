'use client'

import { useEffect } from 'react'

import { useMeQuery } from '@/service/auth'
import { useRouter, useSearchParams } from 'next/navigation'

import '@/styles/index.scss'

export default function Home() {
  const { data, isLoading } = useMeQuery()
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const code = params.get('code')

    console.log(code)
    if (!isLoading) {
      if (data) {
        router.push(`/profile/${data.userId}`)
      } else {
        router.push('/auth/signIn')
      }
    }
  }, [data, params, isLoading, router])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return null
}
