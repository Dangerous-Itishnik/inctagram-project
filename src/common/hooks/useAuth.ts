'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      router.push('/signIn')
    }
    setLoading(false)
  }, [router])

  return { loading }
}
