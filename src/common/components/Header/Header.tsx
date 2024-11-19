'use client'

import { useState } from 'react'

import { Button } from '@/common/components/button'
import { PopUpAuth } from '@/features/auth/ui/popUpAuth/PopUpAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from '@/app/layout.module.scss'

export const Header = () => {
  const { push } = useRouter()
  const [info, setInfo] = useState(false)

  const logoutHandle = () => {
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
      {info && (
        <PopUpAuth onClose={popUpClose} title={'info'} toExecute={logoutHandle}>
          Are you really want to log out of your account ___email name___?
        </PopUpAuth>
      )}
    </header>
  )
}
