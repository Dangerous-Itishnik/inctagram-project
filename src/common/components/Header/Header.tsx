'use client'

import { useState } from 'react'

import { Button } from '@/common/components/button'
import { STORAGE } from '@/common/utils/storage'
import { PopUpAuth } from '@/features/auth/ui/popUpAuth/PopUpAuth'
import { useLogoutMutation } from '@/service/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from '@/app/layout.module.scss'

export const Header = () => {
  const { replace } = useRouter()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [logout] = useLogoutMutation()

  const logoutHandle = async () => {
    await logout()
    STORAGE.deleteToken()
    setIsPopUpOpen(false)
    replace('/signIn')
  }
  const popUpClose = () => {
    setIsPopUpOpen(false)
  }
  const logOut = () => {
    setIsPopUpOpen(true)
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

      <Button as={Link} href={'/profile'}>
        profile
      </Button>
      <Button onClick={logOut}>log out</Button>
      {isPopUpOpen && (
        <PopUpAuth onClose={popUpClose} title={'info'} toExecute={logoutHandle}>
          Are you really want to log out of your account ___email name___?
        </PopUpAuth>
      )}
    </header>
  )
}
