'use client'

import { useEffect, useState } from 'react'

import { tokenSelector } from '@/common/components/Header/tokenSelector'
import { Button } from '@/common/components/button'
import PopUp from '@/common/components/popUp/PopUp'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { useRegistrationMutation } from '@/features/auth/api/authApi'
import { AuthBaseResponse } from '@/features/auth/api/authApi.type'
import SignUp, { SignUpProps } from '@/features/auth/ui/signUp/SignUp'
import { useRouter } from 'next/navigation'

import styles from '@/common/components/popUp/popUp.module.scss'

export default function SignUpPage() {
  const [registration] = useRegistrationMutation()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [signUpEmail, setSignUpEmail] = useState('')
  const [onSubmitError, setOnSubmitError] = useState({})
  const [loading, setLoading] = useState(true)
  const { push } = useRouter()
  const token = useAppSelector(tokenSelector)

  useEffect(() => {
    if (token) {
      return push('/createAccount')
    }
    setLoading(false)
  }, [push])
  if (loading) {
    return <div>Loading...</div>
  }

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
