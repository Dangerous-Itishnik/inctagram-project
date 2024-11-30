'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/common/components/button'
import { PopUp } from '@/common/components/popUp/PopUp'
import { storage } from '@/common/utils/storage'
import { SignUp, SignUpProps } from '@/features/auth/ui/signUp/SignUp'
import { AuthBaseResponse, useMeQuery, useRegistrationMutation } from '@/service/auth'
import { useRouter } from 'next/navigation'

import styles from '@/common/components/popUp/popUp.module.scss'

export default function SignUpPage() {
  const [registration] = useRegistrationMutation()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [signUpEmail, setSignUpEmail] = useState('')
  const [onSubmitError, setOnSubmitError] = useState({})
  const [loading, setLoading] = useState(true)
  const { push } = useRouter()

  const { data } = useMeQuery()

  useEffect(() => {
    if (storage.getToken()) {
      if (data) {
        push(`/profile/${data.userId}`)
      }
    }
    setLoading(false)
  }, [data, push])
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