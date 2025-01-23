import { ComponentPropsWithoutRef } from 'react'

import { Button } from '@/common/components/button'
import * as Dialog from '@radix-ui/react-dialog'

import styles from '@/common/components/RadixModal/RadixModal.module.scss'

type RadixModalProps = {
  modalTitle?: string
  onClose: () => void
  open: boolean
} & ComponentPropsWithoutRef<'div'>

export const RadixModal = ({ children, modalTitle, onClose, open, ...rest }: RadixModalProps) => (
  <Dialog.Root onOpenChange={onClose} open={open} {...rest}>
    <Dialog.Trigger asChild />
    <Dialog.Portal>
      <Dialog.Overlay className={styles.Overlay} />
      <Dialog.Content className={styles.Content}>
        {modalTitle && <Dialog.Title className={styles.Title}>{modalTitle}</Dialog.Title>}
        <Dialog.Description className={styles.Description}>{children}</Dialog.Description>
        {modalTitle && (
          <Dialog.Close asChild>
            <Button aria-label={'Close'} className={`${styles.Button}`}>
              &times;
            </Button>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
