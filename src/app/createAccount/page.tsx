'use client'
import { useAuth } from '@/common/hooks/useAuth'
import { CreateAccount } from '@/features/createAccount/ui/CreateAccount'

const CreateAccountPage = () => {
  useAuth()

  return <CreateAccount />
}

export default CreateAccountPage
