'use client'

import { useState } from 'react'

import { Button } from '@/common/components/button'
import PopUp from '@/common/components/popUp/PopUp'
import { AuthBaseResponse } from '@/features/auth/signUp/api/signUp.types'
import { useSignUpMutation } from '@/features/auth/signUp/api/signUpApi'
import SignUp, { SignUpProps } from '@/features/auth/signUp/ui/SignUp'

import styles from '@/common/components/popUp/popUp.module.scss'

export default function SignUpPage() {
  const [signUp] = useSignUpMutation()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [signUpEmail, setSignUpEmail] = useState('')
  const [onSubmitError, setOnSubmitError] = useState({})

  const signUpHandler = async (data: SignUpProps) => {
    const signUpData = {
      email: data.Email,
      password: data.Password,
      userName: data.UserName,
    }

    try {
      const result = await signUp(signUpData).unwrap()

      setIsPopUpOpen(true)
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

  const closePopUp = () => {
    setIsPopUpOpen(false)
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
      {isPopUpOpen && (
        <PopUp onClose={closePopUp} title={'Email sent'}>
          <p>
            We have sent a link to confirm your email to
            <br />
            {signUpEmail}
          </p>
          <Button className={styles.okButton} onClick={closePopUp}>
            OK
          </Button>
        </PopUp>
      )}
    </>
  )
}
