'use client'
import React from 'react'

import { tokenSelector } from '@/common/components/Header/tokenSelector'
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
  const logoutHandle = () => {
    dispatch(logout())
    push('/signIn')
  }

  return (
    <header className={styles.header}>
      <Link href={'/signUp'}>signUp</Link>
      <br />
      <Link href={'/signIn'}>signIn</Link>
      <br />
      <Link href={'/profile'}>profile</Link>
      {token && <button onClick={logoutHandle}>logout</button>}
    </header>
  )
}
