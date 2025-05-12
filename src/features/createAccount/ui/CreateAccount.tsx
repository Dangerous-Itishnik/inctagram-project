'use client'

import { useState } from 'react'

import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { Button } from '@/common/components/button'
import { storage } from '@/common/utils/storage'
import { useLogoutMutation, useMeQuery } from '@/service/auth'
import { useRouter } from 'next/navigation'

import styles from './CreateAccount.module.scss'

export const CreateAccount = () => {
  const { replace } = useRouter()
  const [isInfoModal, setIsInfoModal] = useState(false)
  const [logout] = useLogoutMutation()
  const { data } = useMeQuery()

  const logoutHandle = async () => {
    await logout()
    storage.deleteToken()
    closePopUp()
    replace('/auth/signIn')
  }
  const closePopUp = () => {
    setIsInfoModal(false)
  }
  const openPopUp = () => {
    setIsInfoModal(true)
  }

  return (
    <div>
      <h1>CreateAccount</h1>
      <Button onClick={openPopUp}>log out</Button>
      {isInfoModal && (
        <InfoModal modalTitle={'Logout'} onClose={() => setIsInfoModal(false)} open={isInfoModal}>
          <p className={styles.infoModalText}>
            Are you really want to log out of your account {data?.email}?
          </p>

          <div className={styles.modalInfoButtons}>
            <Button onClick={logoutHandle} variant={'outline'}>
              Yes
            </Button>
            <Button onClick={closePopUp}>No</Button>
          </div>
        </InfoModal>
      )}
    </div>
  )
}
