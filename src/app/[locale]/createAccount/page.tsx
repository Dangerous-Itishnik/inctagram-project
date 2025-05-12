'use client'
import { RequireAuth } from '@/common/components/requireAuth/RequireAuth'
import { CreateAccount } from '@/features/createAccount/ui/CreateAccount'

export default function CreateAccountPageProtected() {
  return (
    <RequireAuth>
      <CreateAccount />
    </RequireAuth>
  )
}
