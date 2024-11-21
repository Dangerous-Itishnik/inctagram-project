import { PropsWithChildren, useEffect } from 'react'

import { useMeQuery } from '@/service/auth'
import { useRouter } from 'next/navigation'

/**
 *
 * Оборачиваем роут который хотим защитить <RequireAuth>
 */
export function RequireAuth({ children }: PropsWithChildren) {
  const { isError, isLoading } = useMeQuery()
  const { push } = useRouter()

  useEffect(() => {
    if (!isError) {
      return
    }
    void push('/signIn')
  }, [isError, push])

  if (isLoading) {
    return <h1>isLoading</h1>
  }

  if (isError) {
    return
  }

  return <>{children}</>
}
