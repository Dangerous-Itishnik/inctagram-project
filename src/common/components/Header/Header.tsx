'use client'

import { useState } from 'react'

import { tokenSelector } from '@/common/components/Header/tokenSelector'
import { Button } from '@/common/components/button'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { logout } from '@/features/auth/model/authSlice'
import { PopUpAuth } from '@/features/auth/ui/popUpAuth/PopUpAuth'
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
        <PopUpAuth onClose={popUpClose} title={'info'} toExecute={logoutHandle}>
          Are you really want to log out of your account ___email name___?
        </PopUpAuth>
      )}
    </header>
  )
}
