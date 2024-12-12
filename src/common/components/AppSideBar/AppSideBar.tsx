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
import Link from 'next/link'

import styles from './appSideBarStyles.module.scss'
type Props = {
  className: string
}

export const AppSideBar = (props: Props) => {
  return (
    <nav>
      <Link href={'/createAccount'}>
        <PlusSquareOutline />
        Create
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.link}>
              <HomeOutline />
              <span>Home</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link}>
              <PlusSquareOutline />
              <span>Create</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link}>
              <PersonOutline />
              <span>My Profile</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link}>
              <MessageCircleOutline />
              <span>Messenger</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link}>
              <SearchOutline />
              <span>Search</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link}>
              <TrendingUpOutline />
              <span>Statistics</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link}>
              <BookmarkOutline />
              <span>Favorites</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link}>
              <LogOutOutline />
              <span>Log Out</span>
            </Link>
          </li>
        </ul>
      </Link>
    </nav>
  )
}
