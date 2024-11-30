'use client'

import { Button } from '@/common/components/button'
import { storage } from '@/common/utils/storage'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './header.module.scss'

export const Header = () => {
  const pathProfile = usePathname()
  //TODO поменять на Me запрос или переделать
  const token = storage.getToken()

  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <h1 className={styles.logo}>Inctagram</h1>
      </Link>
      {pathProfile.includes('profile') && !token && (
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
