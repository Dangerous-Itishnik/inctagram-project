'use client'

import { useEffect } from 'react'

import RegistrationConfirmation from '@/features/auth/registrationConfirmation/ui/registrationConfirmation'
import { useRegistrationConfirmationMutation } from '@/features/auth/signUp/api/signUpApi'
import { useSearchParams } from 'next/navigation'

export default function RegistrationConfirmationPage() {
  const searchParams = useSearchParams()
  const { code: confirmationCode } = Object.fromEntries(searchParams.entries())

  const [registrationConfirmation] = useRegistrationConfirmationMutation()

  useEffect(() => {
    if (confirmationCode) {
      registrationConfirmation({ confirmationCode })
    }
  }, [confirmationCode, registrationConfirmation])

  return <RegistrationConfirmation />
}
