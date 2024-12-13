import { ReactNode } from 'react'

import { AppSideBar } from '@/common/components/AppSideBar/AppSideBar'

import styles from './containerStyles.module.scss'
export const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.mainContainer}>
      <AppSideBar className={styles.sideBar} />
      <div className={styles.body}>{children}</div>
    </div>
  )
}
