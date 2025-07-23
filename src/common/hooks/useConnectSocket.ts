import { useEffect } from 'react'

import { SocketApi } from '@/socket/useSocket'

export function useConnectSocket() {
  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    if (!token) {
      return
    }

    SocketApi.createConnection(token)

    return () => SocketApi.disconnect()
  }, [token])
}
