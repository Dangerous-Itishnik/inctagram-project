'use client'

import { useState } from 'react'

import { Button } from '@/common/components/button'
import PopUp from '@/common/components/popUp/PopUp'
import { useRegistrationMutation } from '@/features/auth/api/authApi'
import SignUp, { SignUpProps } from '@/features/auth/signUp/ui/SignUp'

import styles from '@/common/components/popUp/popUp.module.scss'

export default function SignUpPage() {
  const [registration] = useRegistrationMutation()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [signUpEmail, setSignUpEmail] = useState('')
  const signUpHandler = (data: SignUpProps) => {
    const signUpData = {
      email: data.Email,
      password: data.Password,
      userName: data.UserName,
    }

    registration(signUpData)
    setIsPopUpOpen(true)
    setSignUpEmail(data.Email)
  }
  const closePopUp = () => {
    setIsPopUpOpen(false)
  }

  return (
    <>
      <SignUp onSubmit={signUpHandler} />
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
