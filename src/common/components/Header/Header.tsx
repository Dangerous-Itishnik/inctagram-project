'use client'

import { useState } from 'react'

import { tokenSelector } from '@/common/components/Header/tokenSelector'
import { Button } from '@/common/components/button'
import { PopUp } from '@/common/components/popUp'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { logout } from '@/features/auth/model/authSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from '@/app/layout.module.scss'

export const Header = () => {
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const token = useAppSelector(tokenSelector)
  const [info, setInfo] = useState(false)

  const logoutHandle = () => {
    dispatch(logout())
    setInfo(false)
    push('/signIn')
  }
  const popUpClose = () => {
    setInfo(false)
  }
  const logOut = () => {
    setInfo(true)
  }

  return (
    <header className={styles.header}>
      {!token && (
        <>
          <Button as={Link} href={'/signUp'}>
            signUp
          </Button>
          <Button as={Link} href={'/signIn'}>
            signIn
          </Button>
        </>
      )}
      <Button as={Link} href={'/profile'}>
        profile
      </Button>
      {token && <Button onClick={logOut}>log out</Button>}
      {info && (
        //TODO Удалить и поставить popUp
        <PopUp onClose={popUpClose} title={'Log out'}>
          Are you really want to log out of your account ___email name___?
          <div className={styles.popUpButtons}>
            <Button className={styles.closeButton} onClick={logoutHandle}>
              Yes
            </Button>
            <Button className={styles.closeButton} onClick={popUpClose}>
              No
            </Button>
          </div>
        </PopUp>
      )}
    </header>
  )
}
