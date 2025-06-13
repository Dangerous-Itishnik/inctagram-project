'use client'
import { useEffect } from 'react'

import { storage } from '@/common/utils/storage'
import HomePostList from '@/features/Home/HomePostList'
import { useRouter } from '@/i18n/navigation'
import { useGoogleLoginMutation } from '@/service/auth'
import { useSearchParams } from 'next/navigation'

export default function ClientHome() {
  const router = useRouter()
  const params = useSearchParams()
  const code = params.get('code')
  const [googleLogin] = useGoogleLoginMutation()
  //const { data } = useMeQuery()

  useEffect(() => {
    const handleGoogleLogin = async (code: string) => {
      try {
        const res = await googleLogin({ code }).unwrap()

        storage.setToken(res.accessToken)

        router.replace('/createAccount')
      } catch (error) {
        console.error('Google Login Error:', error)
        router.replace('/auth/signIn')
      }
    }

    if (code) {
      handleGoogleLogin(code)

      return
    }
  }, [code, googleLogin, router])

  return <HomePostList />
}
