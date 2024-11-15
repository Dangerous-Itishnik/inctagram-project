import React from 'react'

import styles from './popUp2.module.scss'

import { Button } from '../button'

type PopUpProps = {
  children: React.ReactNode
  onClose: () => void
  title: string
}
const PopUp2 = ({ children, onClose, title }: PopUpProps) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <div className={styles.popupHeader}>
          <h2 className={styles.popupTitle}>{title}</h2>
          <Button className={styles.closeButton} onClick={onClose}>
            &times;
          </Button>
        </div>
        <div className={styles.popupBody}>{children}</div>
      </div>
    </div>
  )
}

export default PopUp2
