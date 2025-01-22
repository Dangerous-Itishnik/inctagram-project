'use client'

import { useEffect, useState } from 'react'

import { BellButton } from '@/assets/icons/bell'
// import { SelectBox } from '@/common/components/SelectBox/SelectBox'
import { Button } from '@/common/components/button'
import { storage } from '@/common/utils/storage'
import { ModalPostWindow } from '@/features/posts/ui/createPost/ModalPostWindow'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './header.module.scss'

export const Header = () => {
  const pathProfile = usePathname()

  const [isNotAuth, setIsAuth] = useState(false)
  const [openPostModalWindow, setOpenPostModalWindow] = useState<boolean>(false)

  const handelOpenCreatePost = () => {
    setOpenPostModalWindow(true)
  }

  useEffect(() => {
    if (storage.getToken()) {
      return
    }
    setIsAuth(true)
  }, [isNotAuth])

  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <h1 className={styles.logo}>Inctagram</h1>
      </Link>
      <button onClick={handelOpenCreatePost} type={'button'}>
        Create
      </button>
      {<ModalPostWindow active={openPostModalWindow} setActive={setOpenPostModalWindow} />}
      <div>
        {/* TODO: Фиксануть ошибку в консоли для SelectBox */}
        {/* <SelectBox /> */}
        <BellButton />
      </div>
      {pathProfile.includes('profile') && isNotAuth && (
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
