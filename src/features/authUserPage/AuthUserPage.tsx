'use client'

import { storage } from '@/common/utils/storage'
import { authApi, useLogoutMutation, useMeQuery } from '@/service/auth'
import { MeResponse } from '@/service/auth/auth.types'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

type AuthUserPageProps = {
  meData: MeResponse
}

export const AuthUserPage = ({ meData }: AuthUserPageProps) => {
  const { replace } = useRouter()
  const [logout] = useLogoutMutation()
  const { refetch } = useMeQuery()

  const logoutHandle = async () => {
    await logout()
    storage.deleteToken()
    await refetch()
    replace('/')
  }

  return (
    <>
      <p>{JSON.stringify(meData)}</p>
      <Button onClick={logoutHandle}>log out</Button>
    </>
  )
}
