'use client'

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
import { useModal } from '@/common/hooks/useModal'
import { useMeQuery } from '@/service/auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './AppSideBar.module.scss'

import { LogoutModal } from '../Modals/LogoutModal'

export const AppSideBar = () => {
  const { close: closeLogoutModal, isOpen: isLogoutModalOpen, open: openLogoutModal } = useModal()

  const { data, isError } = useMeQuery()
  const pathname = usePathname()

  return (
    <>
      {data && !isError ? (
        <nav className={styles.sidebar}>
          <ul className={styles.list}>
            <li className={`${styles.item} ${pathname === '/' ? styles.itemActive : ''}`}>
              <Link className={styles.link} href={'/'}>
                <HomeOutline />
                <span>Home</span>
              </Link>
            </li>
            {/* TODO: Тут должна вызываться модалка для создания поста, добавить стили на состояние актив */}
            <li className={`${styles.item} `}>
              <button className={styles.link} type={'button'}>
                <PlusSquareOutline />
                <span>Create</span>
              </button>
            </li>
            <li className={`${styles.item} ${pathname === '/profile' ? styles.itemActive : ''}`}>
              <Link className={styles.link} href={`/profile/${data?.userId}`}>
                <PersonOutline />
                <span>My Profile</span>
              </Link>
            </li>
            <li className={`${styles.item} ${pathname === '/messenger' ? styles.itemActive : ''}`}>
              <Link className={styles.link} href={''}>
                <MessageCircleOutline />
                <span>Messenger</span>
              </Link>
            </li>
            <li className={`${styles.item} ${pathname === '/search' ? styles.itemActive : ''}`}>
              <Link className={styles.link} href={''}>
                <SearchOutline />
                <span>Search</span>
              </Link>
            </li>
            <div className={styles.itemGroup}>
              <li
                className={`${styles.item} ${pathname === '/statistics' ? styles.itemActive : ''}`}
              >
                <Link className={styles.link} href={''}>
                  <TrendingUpOutline />
                  <span>Statistics</span>
                </Link>
              </li>
              <li
                className={`${styles.item} ${pathname === '/favorites' ? styles.itemActive : ''}`}
              >
                <Link className={styles.link} href={''}>
                  <BookmarkOutline />
                  <span>Favorites</span>
                </Link>
              </li>
            </div>
            <li className={styles.item || styles.itemLogout}>
              <button className={styles.link} onClick={openLogoutModal} type={'button'}>
                <LogOutOutline />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
          {isLogoutModalOpen && <LogoutModal email={data?.email} onClose={closeLogoutModal} />}
        </nav>
      ) : null}
    </>
  )
}
