'use client'

import { useState } from 'react'

import { Button } from '@/common/components/button'
import { storage } from '@/common/utils/storage'
import { useLogoutMutation, useMeQuery } from '@/service/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from '@/app/layout.module.scss'

import { PopUp } from '../popUp'

export const Header = () => {
  const { replace } = useRouter()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [logout] = useLogoutMutation()
  const { data } = useMeQuery()

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
        <PopUp onClose={closePopUp} title={'Logout'}>
          <p>Are you really want to log out of your account {data?.email}?</p>
          <div className={styles.popUpButtons}>
            <Button className={styles.closeButton} onClick={logoutHandle}>
              Yes
            </Button>
            <Button className={styles.closeButton} onClick={closePopUp}>
              No
            </Button>
          </div>
        </PopUp>
      )}
    </header>
  )
}
