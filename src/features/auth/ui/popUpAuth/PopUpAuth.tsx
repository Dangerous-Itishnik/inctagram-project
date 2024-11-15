import React, { ReactNode } from 'react'

import { Button } from '@/common/components/button'

import styles from './PopUpAuth.module.scss'

type Props = {
  children: ReactNode
  onClose: () => void
  title: string
  toExecute: () => void
}
const PopUpAuth = ({ children, onClose, title, toExecute }: Props) => {
  return (
    <div className={styles.popupContent}>
      <div className={styles.popupHeader}>
        <h2 className={styles.popupTitle}>{title}</h2>
        <button className={styles.closeButton} onClick={onClose} type={'button'}>
          &times;
        </button>
      </div>
      <div className={styles.popupBody}>
        <div className={styles.popupText}>{children}</div>
        <div className={styles.popupButtons}>
          <Button className={styles.closeButton} onClick={toExecute}>
            Yes
          </Button>
          <Button className={styles.closeButton} onClick={onClose}>
            no
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PopUpAuth
