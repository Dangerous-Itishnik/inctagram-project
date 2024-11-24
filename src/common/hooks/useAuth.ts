'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { storage } from '../utils/storage'

export const useAuth = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = storage.getToken()

    if (!token) {
      router.push('/signIn')
    }
    setLoading(false)
  }, [router])

  return { loading }
}
