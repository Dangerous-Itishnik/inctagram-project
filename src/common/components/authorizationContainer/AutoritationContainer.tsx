import { ReactNode } from 'react'

import styles from './authorizationContainer.module.scss'
type Props = {
  children: ReactNode
}

export const AuthorizationContainer = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>
}
