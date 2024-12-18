'use client'

import { storage } from '@/common/utils/storage'
import { useLogoutMutation } from '@/service/auth'
import { MeResponse } from '@/service/auth/auth.types'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

type AuthUserPageProps = {
  meData: MeResponse
}

export const AuthUserPage = ({ meData }: AuthUserPageProps) => {
  const { replace } = useRouter()
  const [logout] = useLogoutMutation()

  const logoutHandle = async () => {
    storage.deleteToken()
    await logout()
    replace('/')
  }

  return (
    <>
      <p>{JSON.stringify(meData)}</p>
      <Button onClick={logoutHandle}>log out</Button>
    </>
  )
}
