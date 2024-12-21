'use client'

import { useEffect, useState } from 'react'

import { BellButton } from '@/assets/icons/bell'
// import { SelectBox } from '@/common/components/SelectBox/SelectBox'
import { Button } from '@/common/components/button'
import { storage } from '@/common/utils/storage'
import { CreatePost } from '@/features/posts/ui/createPost'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './header.module.scss'


export const Header = () => {
  const pathProfile = usePathname()

  const [isNotAuth, setIsAuth] = useState(false)
  const [openPostWindow, setOpenPostWindow] = useState<boolean>(false)

  const handelOpenCreatePost = () => {
    setOpenPostWindow(true)
  }

  const handelCloseCreatePost = () => {
    setOpenPostWindow(false)
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
      {openPostWindow && <CreatePost onClose={handelCloseCreatePost} />}
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
