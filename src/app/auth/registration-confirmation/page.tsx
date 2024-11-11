'use client'

import { useEffect } from 'react'

import { AuthorizationContainer } from '@/common/components/authorizationContainer/AutoritationContainer'
import { Button } from '@/common/components/button'
import { useRegistrationConfirmationMutation } from '@/features/auth/signUp/api/signUpApi'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function RegistrationConfirmation() {
  const searchParams = useSearchParams()
  const { code: confirmationCode } = Object.fromEntries(searchParams.entries())

  const [registrationConfirmation] = useRegistrationConfirmationMutation()

  useEffect(() => {
    if (confirmationCode) {
      registrationConfirmation({ confirmationCode })
    }
  }, [confirmationCode, registrationConfirmation])

  return (
    <>
      <AuthorizationContainer>
        <h1>Congratulations!</h1>
        <p>Your email has been confirmed</p>
        <Button as={Link} href={'/signIn'} variant={'primary'}>
          Sign In
        </Button>
      </AuthorizationContainer>
    </>
  )
}
