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
import { Button } from '@/common/components/button'
import { PopUp } from '@/common/components/popUp'
import { storage } from '@/common/utils/storage'
import { useLogoutMutation, useMeQuery } from '@/service/auth'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import styles from './appSideBarStyles.module.scss'

export const AppSideBar = () => {
  const { replace } = useRouter()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [logout] = useLogoutMutation()
  const { data, isError } = useMeQuery()
  const pathname = usePathname()
  const logoutHandle = async () => {
    storage.deleteToken()
    await logout()
    closePopUp()
    replace('/')
  }
  const closePopUp = () => {
    setIsPopUpOpen(false)
  }
  const openPopUp = () => {
    setIsPopUpOpen(true)
  }

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
              <button className={styles.link} onClick={openPopUp} type={'button'}>
                <LogOutOutline />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
          {isPopUpOpen && (
            <PopUp onClose={closePopUp} title={'Logout'}>
              <p>Are you really want to log out of your account {data?.email}?</p>
              <div className={styles.popUpButtons}>
                <Button className={styles.closeButton} onClick={logoutHandle}>
                  Yes
                </Button>
                <Button className={styles.closeButton} onClick={closePopUp}>
                  No
                </Button>
              </div>
            </PopUp>
          )}
        </nav>
      ) : null}
    </>
  )
}
