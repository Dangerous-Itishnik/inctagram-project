'use client'

import { Button } from '@/common/components/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './header.module.scss'

export const Header = () => {
  const pathProfile = usePathname()

  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <h1 className={styles.logo}>Inctagram</h1>
      </Link>
      {pathProfile.includes('profile') && (
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
