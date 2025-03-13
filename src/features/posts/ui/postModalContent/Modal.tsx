import { ComponentProps, ReactNode } from 'react'

import Close from '@/assets/icons/components/Close'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogTitle } from '@radix-ui/react-dialog'

import styles from './modal.module.scss'

type Props = {
  buttonText?: string
  children: ReactNode
  clickNext?: () => void
  closeButton?: boolean
  closePostModal?: () => void
  disableButton?: boolean
  isHeaderDisabled?: boolean
  onClose?: () => void
  onInteractOutside?: (event: Event) => void
  open: boolean
  title?: string
} & ComponentProps<'div'>

export const Modal = ({ children, onClose, onInteractOutside, open = false, title }: Props) => {
  const handleOpenChange = () => {
    onClose?.()
  }

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={open}>
      <div>
        {open && (
          <Dialog.Portal>
            <Dialog.Overlay className={styles.modalOverlay} inert={open ? undefined : true} />

            <Dialog.Content
              aria-describedby={''}
              className={styles.modalContent}
              onInteractOutside={onInteractOutside}
            >
              <div>
                <DialogTitle className={styles.title}>{title}</DialogTitle>
                <Dialog.Close className={styles.close} onClick={onClose}>
                  <Close />
                </Dialog.Close>
                <Dialog.Description asChild>{children}</Dialog.Description>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </div>
    </Dialog.Root>
  )
}
