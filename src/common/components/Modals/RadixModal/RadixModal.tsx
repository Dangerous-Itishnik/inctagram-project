import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Button } from '@/common/components/button'
import * as Dialog from '@radix-ui/react-dialog'

import styles from '@/common/components/Modals/RadixModal/RadixModal.module.scss'

type RadixModalProps = {
  modalButtonClose?: ReactNode
  modalTitle: ReactNode | string
  onClose: () => void
  open: boolean
} & ComponentPropsWithoutRef<'div'>

export const RadixModal = ({
  children,
  modalButtonClose,
  modalTitle,
  onClose,
  open,
  ...rest
}: RadixModalProps) => (
  <Dialog.Root onOpenChange={onClose} open={open} {...rest}>
    <Dialog.Trigger asChild />
    <Dialog.Portal>
      <Dialog.Overlay className={styles.Overlay} />
      <Dialog.Content className={styles.Content}>
        <Dialog.Title className={styles.title}>{modalTitle}</Dialog.Title>
        <Dialog.Description className={styles.Description}>{children}</Dialog.Description>
        <Dialog.Close asChild>
          {typeof modalTitle === 'string' ? (
            <Button className={styles.buttonClose} variant={'link'}>
              X
            </Button>
          ) : (
            modalButtonClose
          )}
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
