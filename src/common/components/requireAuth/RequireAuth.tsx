'use client'

import { PropsWithChildren, useEffect } from 'react'

import { useMeQuery } from '@/service/auth'
import { useRouter } from 'next/navigation'

/**
 *
 * Оборачиваем роут который хотим защитить <RequireAuth>
 */
export function RequireAuth({ children }: PropsWithChildren) {
  const { isError } = useMeQuery()
  const { push } = useRouter()

  useEffect(() => {
    if (!isError) {
      return
    }
    void push('/auth/signIn')
  }, [isError, push])

  if (isError) {
    return
  }

  return <>{children}</>
}
