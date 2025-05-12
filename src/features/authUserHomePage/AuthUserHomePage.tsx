'use client'

import { MeResponse } from '@/service/auth/auth.types'

type AuthUserPageProps = {
  meData: MeResponse
}

export const AuthUserHomePage = ({ meData }: AuthUserPageProps) => {
  return (
    <>
      <p>Ты успешно залогинился {meData.userName}!</p>
    </>
  )
}
