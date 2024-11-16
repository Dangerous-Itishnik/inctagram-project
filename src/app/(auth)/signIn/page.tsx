'use client'

import { useEffect, useState } from 'react'

import SignIn from '@/features/auth/ui/signIn/SingIn'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { push } = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      return push('/createAccount')
    }
    setLoading(false)
  }, [push])

  if (loading) {
    return <div>Loading...</div>
  }

  return <SignIn />
}
