'use client'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store/store'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectorIsAuthenticated } from '@/features/createAccount/model/useSelectorsCreateAccount'
import { CreateAccount } from '@/features/createAccount/ui/CreateAccount'
import { useRouter } from 'next/navigation'

const CreateAccountPage = () => {
  const isAuthenticated = useAppSelector(selectorIsAuthenticated)

  const router = useRouter()

  if (!isAuthenticated) {
    return router.push('/signIn')
  }

  return <CreateAccount />
}

export default CreateAccountPage
