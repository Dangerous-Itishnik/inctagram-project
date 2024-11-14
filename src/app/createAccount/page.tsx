'use client'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectorIsAuthenticated } from '@/features/createAccount/model/useSelectorsCreateAccount'
import { CreateAccount } from '@/features/createAccount/ui/CreateAccount'
import { useRouter } from 'next/navigation'

const CreateAccountPage = () => {
  const isAuthenticated = useAppSelector(selectorIsAuthenticated)

  const { push } = useRouter()

  if (!isAuthenticated) {
    return push('/signIn')
  }

  return <CreateAccount />
}

export default CreateAccountPage
