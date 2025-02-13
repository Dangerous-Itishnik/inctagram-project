import { ComponentPropsWithoutRef } from 'react'

import { RadixModal } from '@/common/components/Modals/RadixModal/RadixModal'
import { Button } from '@/common/components/button'

import styles from '@/common/components/Modals/InfoModal/InfoModal.module.scss'

export type InfoModalProps = {
  closePostManagement: () => void
  onClose: () => void
  open: boolean
} & ComponentPropsWithoutRef<'div'>

export const InfoModal = ({ closePostManagement, onClose, open }: InfoModalProps) => {
  return (
      <RadixModal modalTitle={'Close'} onClose={onClose} open={open}>
        <div className={styles.notificationWindow}>
          <div className={styles.message}>
            Do you really want to close the creation of a publication? If you close everything will be
            deleted{' '}
          </div>
          <div className={styles.buttons}>
            <Button onClick={() => closePostManagement()} variant={'outline'}>
              Discard
            </Button>
            <Button onClick={onClose} variant={'outline'}>
              Save draft
            </Button>
          </div>
        </div>
      </RadixModal>
  )
}