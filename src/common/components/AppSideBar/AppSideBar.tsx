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
type Props = {
  className: string
}

export const AppSideBar = (props: Props) => {
  const { replace } = useRouter()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [logout] = useLogoutMutation()
  const { data } = useMeQuery()
  const pathname = usePathname()
  const logoutHandle = async () => {
    await logout()
    storage.deleteToken()
    closePopUp()
    replace('/auth/signIn')
  }
  const closePopUp = () => {
    setIsPopUpOpen(false)
  }
  const openPopUp = () => {
    setIsPopUpOpen(true)
  }

  return (
    <>
      <nav>
        <ul className={styles.list}>
          <li className={`${styles.item} ${pathname === '/home' ? styles.itemActive : ''}`}>
            <Link className={styles.link} href={'/home'}>
              <HomeOutline />
              <span>Home</span>
            </Link>
          </li>
          <li
            className={`${styles.item} ${pathname === '/createAccount' ? styles.itemActive : ''}`}
          >
            <Link className={styles.link} href={'/createAccount'}>
              <PlusSquareOutline />
              <span>Create</span>
            </Link>
          </li>
          <li className={`${styles.item} ${pathname === '/profile' ? styles.itemActive : ''}`}>
            <Link className={styles.link} href={'/profile'}>
              <PersonOutline />
              <span>My Profile</span>
            </Link>
          </li>
          <li className={`${styles.item} ${pathname === '/messenger' ? styles.itemActive : ''}`}>
            <Link className={styles.link} href={'/messenger'}>
              <MessageCircleOutline />
              <span>Messenger</span>
            </Link>
          </li>
          <li className={`${styles.item} ${pathname === '/search' ? styles.itemActive : ''}`}>
            <Link className={styles.link} href={'/search'}>
              <SearchOutline />
              <span>Search</span>
            </Link>
          </li>
          <div className={styles.itemGroup}>
            <li className={`${styles.item} ${pathname === '/statistics' ? styles.itemActive : ''}`}>
              <Link className={styles.link} href={'/statistics'}>
                <TrendingUpOutline />
                <span>Statistics</span>
              </Link>
            </li>
            <li className={`${styles.item} ${pathname === '/favorites' ? styles.itemActive : ''}`}>
              <Link className={styles.link} href={'/favorites'}>
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
      </nav>
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
    </>
  )
}
