'use client'

import { useState } from 'react'

import { SignUpModal } from '@/common/components/Modals/SignUpModal'
import { useModal } from '@/common/hooks/useModal'
import { SignUp, SignUpProps } from '@/features/auth/ui/signUp/SignUp'
import { AuthBaseResponse, useRegistrationMutation } from '@/service/auth'

export default function SignUpPage() {
  const [registration] = useRegistrationMutation()
  const { close: closeSignUpModal, isOpen: isSignUpModalOpen, open: openSignUpModal } = useModal()

  const [signUpEmail, setSignUpEmail] = useState('')
  const [onSubmitError, setOnSubmitError] = useState({})

  const signUpHandler = async (data: SignUpProps) => {
    const signUpData = {
      email: data.Email,
      password: data.Password,
      userName: data.UserName,
    }

    try {
      const result = await registration(signUpData).unwrap()

      registration(signUpData)
      openSignUpModal()
      setSignUpEmail(data.Email)

      return result
    } catch (error) {
      const authError = error as AuthBaseResponse

      if (authError.data?.messages) {
        setOnSubmitError(authError.data.messages[0])
      }
      throw error
    }
  }

  const clearEmailAndUserNameError = () => {
    setOnSubmitError({})
  }

  return (
    <>
      <SignUp
        clearEmailAndUserNameError={clearEmailAndUserNameError}
        onSubmit={signUpHandler}
        onSubmitError={onSubmitError}
      />
      {isSignUpModalOpen && <SignUpModal email={signUpEmail} onClose={closeSignUpModal} />}
    </>
  )
}
