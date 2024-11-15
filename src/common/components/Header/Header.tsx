'use client'

import { tokenSelector } from '@/common/components/Header/tokenSelector'
import { Button } from '@/common/components/button'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { logout } from '@/features/auth/model/authSlice'
import { useRouter } from 'next/navigation'

import styles from '@/app/layout.module.scss'

export const Header = () => {
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const token = useAppSelector(tokenSelector)
  const logoutHandle = () => {
    dispatch(logout())
    push('/signIn')
  }

  return (
    <header className={styles.header}>
      {!token && (
        <>
          <Button as={'a'} href={'/signUp'}>
            signUp
          </Button>
          <Button as={'a'} href={'/signIn'}>
            signIn
          </Button>
        </>
      )}
      <Button as={'a'} href={'/profile'}>
        profile
      </Button>
      {token && (
        <Button as={'a'} onClick={logoutHandle}>
          log out
        </Button>
      )}
    </header>
  )
}
