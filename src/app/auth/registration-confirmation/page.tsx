'use client'

import { useEffect } from 'react'

import RegistrationConfirmation from '@/features/auth/registrationConfirmation/ui/registrationConfirmation'
import { useRegistrationConfirmationMutation } from '@/features/auth/signUp/api/signUpApi'
import { useRouter, useSearchParams } from 'next/navigation'

export default function RegistrationConfirmationPage() {
  const searchParams = useSearchParams()
  const confirmationCode = searchParams.get('code')
  const router = useRouter()

  const [registrationConfirmation] = useRegistrationConfirmationMutation()

  useEffect(() => {
    const isConfirmed = localStorage.getItem('registrationConfirmed') === confirmationCode

    if (confirmationCode && !isConfirmed) {
      registrationConfirmation({ confirmationCode }).then(() => {
        localStorage.setItem('registrationConfirmed', confirmationCode)
      })
    }
  }, [confirmationCode, registrationConfirmation])

  if (!confirmationCode) {
    router.push('/signUp')

    return null
  }

  return <RegistrationConfirmation />
}
