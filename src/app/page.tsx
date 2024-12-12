'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { storage } from '@/common/utils/storage'
import { useGoogleLoginMutation, useMeQuery } from '@/service/auth'
import { setAuthState } from '@/service/auth/authSlice'
import { useRouter, useSearchParams } from 'next/navigation'

import '@/styles/index.scss'

export default function Home() {
  const { replace } = useRouter()
  const params = useSearchParams()
  const code = params.get('code')
  const [googleLogin] = useGoogleLoginMutation()
  const { data, refetch } = useMeQuery()
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)

  console.log('render')
  useEffect(() => {
    if (code) {
      googleLogin({ code })
        .unwrap()
        .then(result => {
          storage.setToken(result.accessToken)
          refetch().then(res => {
            replace(`/profile/${res.data?.userId}`)
          })
        })
    }
    if (data) {
      dispatch(setAuthState(data))
      replace(`/profile/${data.userId}`)
    }
    replace('/auth/signIn')
  }, [code, googleLogin, replace, refetch, data])

  return null
}
