'use client'

import { useEffect, useState } from 'react'

import { tokenSelector } from '@/common/components/Header/tokenSelector'
import { Button } from '@/common/components/button'
import { Link1 } from '@/common/components/typography/typography.stories'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { logout } from '@/features/auth/model/authSlice'
import PopUpAuth from '@/features/auth/ui/popUpAuth/PopUpAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from '@/app/layout.module.scss'

export const Header = () => {
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  // const [token, setToken] = useState(false)
  // const token = localStorage.getItem('authToken')
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

  //TODO не работает. Кнопка signUp не переводит на нужную страницу
  return (
    <header className={styles.header}>
      {!token && (
        <>
          {/*<Button as={'a'} href={'/signUp'}>*/}
          {/*  signUp*/}
          {/*</Button>*/}
          {/*<Button as={'a'} href={'/signIn'}>*/}
          {/*  signIn*/}
          {/*</Button>*/}
          <Link href={'/signUp'}>signUp</Link>
          <Link href={'/signIn'}>signIn</Link>
        </>
      )}
      <Button as={'a'} href={'/profile'}>
        profile
      </Button>
      {token && (
        <Button as={'a'} onClick={logOut}>
          log out
        </Button>
      )}
      {info && (
        <PopUpAuth onClose={popUpClose} title={'info'} toExecute={logoutHandle}>
          Are you really want to log out of your account ___email name___?
        </PopUpAuth>
      )}
    </header>
  )
}
