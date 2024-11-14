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
    setLoading(false)
  }, [router])
  if (loading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}