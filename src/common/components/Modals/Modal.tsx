import React from 'react'

import styles from './Modal.module.scss'

import { Button } from '../button'

type Props = {
  children: React.ReactNode
  onClose: () => void
  title: string
}
export const Modal = ({ children, onClose, title }: Props) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <Button className={styles.closeButton} onClick={onClose}>
            &times;
          </Button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  )
}
