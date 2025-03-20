import { HTMLProps, useState } from 'react'

import {
  BookmarkOutline,
  LogOutOutline,
  SettingsOutline,
  TrendingUpOutline,
} from '@/assets/icons/components'
import { useMeQuery } from '@/service/auth'
import Link from 'next/link'

import styles from './DropDownMenuHeader.module.scss' // Путь к вашему SCSS файлу

type Props = {
  openPopUp: () => void
} & HTMLProps<HTMLDivElement>
export const DropDownMenuHeader = ({ openPopUp }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: me } = useMeQuery()

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className={styles.dropdown}>
      <button className={styles.trigger} onClick={toggleMenu} type={'button'}>
        <span className={isOpen ? styles.isActive : ''}></span>
      </button>

      {isOpen && (
        <div className={`${styles.content} ${isOpen ? styles.show : ''}`}>
          <ul>
            <li onClick={closeMenu}>
              <Link className={styles.link} href={`/profile/${me?.userId}/settings`}>
                <SettingsOutline />
                <span>Profile Setting</span>
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link className={styles.link} href={''}>
                <TrendingUpOutline />
                <span>Statistics</span>
              </Link>
            </li>
            <li onClick={closeMenu}>
              {' '}
              <Link className={styles.link} href={''}>
                <BookmarkOutline />
                <span>Favorites</span>
              </Link>
            </li>
            <li onClick={closeMenu}>
              <button className={styles.link} onClick={openPopUp} type={'button'}>
                <LogOutOutline />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
