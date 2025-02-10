'use client'

import { useState } from 'react'

import { DropDownMenuHeader } from '@/common/components/DropDownMenuHeader/DropDownMenuHeader'
import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
// import { SelectBox } from '@/common/components/SelectBox/SelectBox'
import { Button } from '@/common/components/button'
import { storage } from '@/common/utils/storage'
import { useLogoutMutation, useMeQuery } from '@/service/auth'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import styles from './header.module.scss'

export const Header = () => {
  const pathProfile = usePathname()
  const [isInfoModal, setIsInfoModal] = useState<boolean>(false)
  const { isError: isNotAuth } = useMeQuery()
  const { data } = useMeQuery()
  const closePopUp = () => {
    setIsInfoModal(false)
  }
  const openPopUp = () => {
    setIsInfoModal(true)
  }
  const { replace } = useRouter()
  const [logout] = useLogoutMutation()
  const logoutHandle = async () => {
    storage.deleteToken()
    await logout()
    closePopUp()
    replace('/')
  }

  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <h1 className={styles.logo}>Inctagram</h1>
      </Link>
      <div>{/* TODO:Добавить логику для отображения колокольчика и выбора языков */}</div>
      <DropDownMenuHeader openPopUp={openPopUp} />
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
      {!pathProfile.includes('auth') && isNotAuth && (
        <div className={styles.buttons}>
          <Button as={Link} href={'/auth/signIn'} variant={'link'}>
            Log in
          </Button>
          <Button as={Link} href={'/auth/signUp'}>
            Sign Up
          </Button>
        </div>
      )}
    </header>
  )
}
