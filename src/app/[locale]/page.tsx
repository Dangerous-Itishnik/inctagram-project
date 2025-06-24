'use client'
import { useEffect, useState } from 'react'

import UnClientPage from '@/common/components/UnClientPage/UnClientPage'
import { storage } from '@/common/utils/storage'
import { Spinner } from '@radix-ui/themes'
import dynamic from 'next/dynamic'

const ClientHome = dynamic(() => import('../../common/components/ClinetHome/ClientHome'), {
  loading: () => <Spinner />,
  ssr: false,
})

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    setIsAuthenticated(!!storage.getToken())
  }, [])

  if (isAuthenticated === null) {
    return <Spinner />
  }

  return <div>{isAuthenticated ? <ClientHome /> : <UnClientPage />}</div>
}

export default Home
