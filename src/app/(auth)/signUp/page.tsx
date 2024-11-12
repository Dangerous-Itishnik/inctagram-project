'use client'

import { useState } from 'react'

import { Button } from '@/common/components/button'
import PopUp from '@/common/components/popUp/PopUp'
import { useSignUpMutation } from '@/features/auth/signUp/api/signUpApi'
import SignUp, { SignUpProps } from '@/features/auth/signUp/ui/SignUp'

import styles from '@/common/components/popUp/popUp.module.scss'

export default function SignUpPage() {
  const [signUp] = useSignUpMutation()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [signUpEmail, setSignUpEmail] = useState('')

  const signUpHandler = (data: SignUpProps) => {
    const signUpData = {
      email: data.Email,
      password: data.Password,
      userName: data.UserName,
    }

    signUp(signUpData)
      .unwrap()
      .then(() => {
        setIsPopUpOpen(true)
        setSignUpEmail(data.Email)
      })
      .catch(error => {
        console.error('Sign up failed:', error)
      })
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
