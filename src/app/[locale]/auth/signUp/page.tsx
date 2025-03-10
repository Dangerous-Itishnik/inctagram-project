'use client'

import { useState } from 'react'

import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { Button } from '@/common/components/button'
import { SignUp, SignUpProps } from '@/features/auth/ui/signUp/SignUp'
import { AuthBaseResponse, useRegistrationMutation } from '@/service/auth'

import styles from '@/common/components/PopUp/PopUp.module.scss'

export default function SignUpPage() {
  const [registration] = useRegistrationMutation()
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
      const result = await registration(signUpData).unwrap()

      registration(signUpData)
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
        <InfoModal modalTitle={'Logout'} onClose={() => setIsPopUpOpen(false)} open={isPopUpOpen}>
          <p className={styles.infoModalText}>
            We have sent a link to confirm your email to
            {signUpEmail}
          </p>

          <div className={styles.modalInfoButtons}>
            <Button className={styles.okButton} onClick={closePopUp}>
              OK
            </Button>
          </div>
        </InfoModal>
      )}
    </>
  )
}
