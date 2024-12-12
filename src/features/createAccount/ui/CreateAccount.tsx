'use client'

import { useState } from 'react'

import { MainContainer } from '@/common/components/MainContainer/MainContainer'
import { Button } from '@/common/components/button'
import { PopUp } from '@/common/components/popUp'
import { storage } from '@/common/utils/storage'
import { useLogoutMutation, useMeQuery } from '@/service/auth'
import { useRouter } from 'next/navigation'

import styles from './CreateAccount.module.scss'

export const CreateAccount = () => {
  const { replace } = useRouter()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [logout] = useLogoutMutation()
  const { data } = useMeQuery()

  const logoutHandle = async () => {
    await logout()
    storage.deleteToken()
    closePopUp()
    replace('/auth/signIn')
  }
  const closePopUp = () => {
    setIsPopUpOpen(false)
  }
  const openPopUp = () => {
    setIsPopUpOpen(true)
  }

  return (
    <>
      <MainContainer>
        <h1>CreateAccount</h1>
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
      </MainContainer>
    </>
  )
}
