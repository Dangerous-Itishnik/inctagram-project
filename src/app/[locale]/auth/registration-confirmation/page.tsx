'use client'

import { useEffect, useState } from 'react'

import { RegistrationConfirmation } from '@/features/auth/ui/registrationConfirmation'
import { useRouter } from '@/i18n/navigation'
import { useRegistrationConfirmationMutation } from '@/service/auth'
import { useSearchParams } from 'next/navigation'

export default function RegistrationConfirmationPage() {
  const searchParams = useSearchParams()
  const confirmationCode = searchParams.get('code')
  const router = useRouter()

  const [registrationConfirmation] = useRegistrationConfirmationMutation()
  const [isConfirmed, setIsConfirmed] = useState(false)

  useEffect(() => {
    if (confirmationCode) {
      registrationConfirmation({ confirmationCode })
        .unwrap()
        .then(() => {
          setIsConfirmed(true)
        })
        .catch(() => {
          router.replace('/auth/registration-email-resending')
        })
    } else {
      router.replace('/auth/signUp')
    }
  }, [confirmationCode, registrationConfirmation, router])

  return isConfirmed ? <RegistrationConfirmation /> : null
}
