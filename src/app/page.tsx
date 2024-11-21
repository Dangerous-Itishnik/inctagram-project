'use client'

import { useEffect } from 'react'

import { useMeQuery } from '@/service/auth'
import { useRouter } from 'next/navigation'

import '@/styles/index.scss'

export default function Home() {
  const { data, isLoading } = useMeQuery()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        router.push(`/profile/${data.userId}`)
      } else {
        router.push('/signIn')
      }
    }
  }, [data, isLoading, router])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return null
}
