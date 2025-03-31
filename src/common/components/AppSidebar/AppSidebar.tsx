'use client'
import { useState } from 'react'

import {
  BookmarkOutline,
  HomeOutline,
  LogOutOutline,
  MessageCircleOutline,
  PersonOutline,
  PlusSquareOutline,
  SearchOutline,
  TrendingUpOutline,
} from '@/assets/icons/components'
import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { Button } from '@/common/components/button'
import { useModal } from '@/common/hooks/useModal'
import { storage } from '@/common/utils/storage'
import { CreatePost } from '@/features/posts/ui/createPost/CreatePost'
import { Link, useRouter } from '@/i18n/navigation'
import { useLogoutMutation, useMeQuery } from '@/service/auth'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import styles from './appSideBarStyles.module.scss'

export const AppSideBar = () => {
  const { replace } = useRouter()
  const pathname = usePathname()

  const [isCreatePostsModal, setIsCreatePostsModal] = useState<boolean>(false)
  const [, locale, ...pathParts] = pathname.split('/')
  const currentPath = `/${pathParts.join('/')}`

  const [logout] = useLogoutMutation()
  const { data, isError } = useMeQuery()
  const { closeModal, isOpen, openModal } = useModal()

  const logoutHandle = async () => {
    storage.deleteToken()
    await logout()
    closeModal()
    replace('/')
  }

  return (
    <>
      {data && !isError && (
        <nav className={styles.sidebar}>
          <ul className={styles.list}>
            <li className={clsx(styles.item, pathname === `/${locale}` && styles.itemActive)}>
              <Link className={styles.link} href={'/'}>
                <HomeOutline />
                <span className={styles.notMobile}>Home</span>
              </Link>
            </li>
            {/* TODO: Тут должна вызываться модалка для создания поста, добавить стили на состояние актив */}
            <li className={`${styles.item} `}>
              <button
                className={styles.link}
                onClick={() => setIsCreatePostsModal(true)}
                type={'button'}
              >
                <PlusSquareOutline />
                <span className={styles.notMobile}>Create</span>
              </button>
            </li>
            <li
              className={clsx(styles.item, currentPath.startsWith('/profile') && styles.itemActive)}
            >
              <Link className={styles.link} href={`/profile/${data?.userId}`}>
                <PersonOutline />
                <span className={styles.notMobile}>My Profile</span>
              </Link>
            </li>
            <li
              className={clsx(
                styles.item,
                currentPath.startsWith('/messenger') && styles.itemActive
              )}
            >
              <Link className={styles.link} href={''}>
                <MessageCircleOutline />
                <span className={styles.notMobile}>Messenger</span>
              </Link>
            </li>
            <li
              className={clsx(styles.item, currentPath.startsWith('/search') && styles.itemActive)}
            >
              <Link className={styles.link} href={''}>
                <SearchOutline />
                <span className={styles.notMobile}>Search</span>
              </Link>
            </li>
            <div className={`${styles.itemGroup} ${styles.notMobile}`}>
              <li
                className={clsx(
                  styles.item,
                  currentPath.startsWith('/statistics') && styles.itemActive
                )}
              >
                <Link className={styles.link} href={''}>
                  <TrendingUpOutline />
                  <span>Statistics</span>
                </Link>
              </li>
              <li
                className={clsx(
                  styles.item,
                  currentPath.startsWith('/favorites') && styles.itemActive
                )}
              >
                <Link className={styles.link} href={''}>
                  <BookmarkOutline />
                  <span>Favorites</span>
                </Link>
              </li>
            </div>
            <li
              className={
                (styles.item && styles.notMobile) || (styles.itemLogout && styles.notMobile)
              }
            >
              <button className={styles.link} onClick={openModal} type={'button'}>
                <LogOutOutline />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
          <InfoModal modalTitle={'Logout'} onClose={closeModal} open={isOpen}>
            <p className={styles.infoModalText}>
              Are you really want to log out of your account {data?.email}?
            </p>
            <div className={styles.modalInfoButtons}>
              <Button onClick={logoutHandle} variant={'outline'}>
                Yes
              </Button>
              <Button onClick={closeModal}>No</Button>
            </div>
          </InfoModal>
        </nav>
      )}
      <CreatePost active={isCreatePostsModal} setActive={setIsCreatePostsModal} />
    </>
  )
}
