'use client'

import { useState } from 'react'

import { Button } from '@/common/components/button'
import { storage } from '@/common/utils/storage'
import { PopUpAuth } from '@/features/auth/ui/popUpAuth/PopUpAuth'
import { useLogoutMutation } from '@/service/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from '@/app/layout.module.scss'

export const Header = () => {
  const { replace } = useRouter()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [logout] = useLogoutMutation()

  const closePopUp = () => {
    setIsPopUpOpen(false)
  }
  const openPopUp = () => {
    setIsPopUpOpen(true)
  }

  const logoutHandle = async () => {
    await logout()
    storage.deleteToken()
    closePopUp()
    replace('/signIn')
  }

  return (
    <header className={styles.header}>
      <>
        <Button as={Link} href={'/signUp'}>
          signUp
        </Button>
        <Button as={Link} href={'/signIn'}>
          signIn
        </Button>
      </>

      <Button onClick={openPopUp}>log out</Button>
      {isPopUpOpen && (
        <PopUpAuth onClose={openPopUp} title={'info'} toExecute={logoutHandle}>
          Are you really want to log out of your account ___email name___?
        </PopUpAuth>
      )}
    </header>
  )
}
