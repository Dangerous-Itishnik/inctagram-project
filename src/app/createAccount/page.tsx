'use client'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store/store'
import { useRouter } from 'next/navigation'

const CreateAccount = () => {
  //TODO вынести useSelector
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  const router = useRouter()

  if (!isAuthenticated) {
    return router.push('/signIn')
  }

  return <div>CreateAccount</div>
}

export default CreateAccount
