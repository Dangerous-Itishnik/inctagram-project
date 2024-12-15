'use client'

// import { BellButton } from '@/assets/icons/bell'
// import { SelectBox } from '@/common/components/SelectBox/SelectBox'
import { Button } from '@/common/components/button'
import { useMeQuery } from '@/service/auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './header.module.scss'

export const Header = () => {
  const pathProfile = usePathname()

  /*   const [isNotAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if (storage.getToken()) {
      return
    }
    setIsAuth(true)
  }, [isNotAuth]) */

  const { isError: isNotAuth } = useMeQuery()

  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <h1 className={styles.logo}>Inctagram</h1>
      </Link>
      <div>
        {/* TODO: Фиксануть ошибку в консоли для SelectBox */}
        {/* <BellButton /> */}
        {/* <SelectBox /> */}
      </div>
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
