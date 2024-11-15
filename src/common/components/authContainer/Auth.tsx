'use client'
import { ReactNode, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

export const Auth = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      router.push('/signIn')
    }
    //TODO для того что бы не показывалась страница если ты не авторизован
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
