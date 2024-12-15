'use client'

/* import { useState } from 'react'

import { PopUp } from '@/common/components/popUp' */
import { storage } from '@/common/utils/storage'
import { useLogoutMutation } from '@/service/auth'
import { MeResponse } from '@/service/auth/auth.types'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

type AuthUserPageProps = {
  meData: MeResponse
}

export const AuthUserPage = ({ meData }: AuthUserPageProps) => {
  const { replace } = useRouter()
  /*   const [isPopUpOpen, setIsPopUpOpen] = useState(false) */
  const [logout] = useLogoutMutation()

  const logoutHandle = async () => {
    await logout()
    storage.deleteToken()
    /*     closePopUp() */
    replace('/auth/signIn')
  }
  /*   const closePopUp = () => {
    setIsPopUpOpen(false)
  }
  const openPopUp = () => {
    setIsPopUpOpen(true)
  } */

  return (
    <>
      <p>{JSON.stringify(meData)}</p>
      <Button onClick={logoutHandle}>log out</Button>

      {/* {isPopUpOpen && (
        <PopUp onClose={closePopUp} title={'Logout'}>
          <p>Are you really want to log out of your account {meData?.email}?</p>
          <div className={styles.popUpButtons}>
            <Button className={styles.closeButton} onClick={logoutHandle}>
              Yes
            </Button>
            <Button className={styles.closeButton} onClick={closePopUp}>
              No
            </Button>
          </div>
        </PopUp>
      )} */}
    </>
  )
}
