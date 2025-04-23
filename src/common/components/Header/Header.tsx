'use client'

import { useEffect, useRef, useState } from 'react'

import { DropDownMenuHeader } from '@/common/components/DropDownMenuHeader/DropDownMenuHeader'
import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { SelectLanguage } from '@/common/components/SelectLanguage/SelectLanguage'
import { Button } from '@/common/components/button'
import { storage } from '@/common/utils/storage'
import Notifications from '@/features/notifications/Notifications'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useLogoutMutation, useMeQuery } from '@/service/auth'
import { SocketApi } from '@/socket/useSocket'

import styles from './header.module.scss'

export const Header = () => {
  const [isInfoModal, setIsInfoModal] = useState<boolean>(false)
  const { data, isError: isNotAuth } = useMeQuery()
  const { replace } = useRouter()
  const [logout] = useLogoutMutation()
  const pathname = usePathname()
  const token = storage.getToken()

  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsInfoModal(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    if (token && !SocketApi.socket) {
      SocketApi.createConnection(token)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      if (token && SocketApi.socket) {
        SocketApi.socket.disconnect()
      }
    }
  }, [token])

  const closePopUp = () => {
    setIsInfoModal(false)
  }
  const openPopUp = () => {
    setIsInfoModal(true)
  }

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
      <div ref={menuRef}>
        <Notifications />
      </div>
      <div>
        <SelectLanguage />
      </div>
      {data && <DropDownMenuHeader openPopUp={openPopUp} />}
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
      {!pathname.includes('auth') && isNotAuth && (
        <div className={styles.buttons}>
          <Button variant={'link'}>
            <Link href={'/auth/signIn'}>Log in</Link>
          </Button>
          <Button>
            <Link href={'/auth/signUp'}> Sign Up</Link>
          </Button>
        </div>
      )}
    </header>
  )
}
