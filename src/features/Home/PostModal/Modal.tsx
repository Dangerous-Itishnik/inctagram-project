import { ComponentProps, ReactNode } from 'react'

import Close from '@/assets/icons/components/Close'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/themes'

import styles from './modal.module.scss'

type Props = {
  buttonText?: string
  children: ReactNode
  clickNext?: () => void
  closeButton?: boolean
  closeButtonPosition?: 'inside' | 'outside'
  closePostModal?: () => void
  disableButton?: boolean
  isHeaderDisabled?: boolean
  modalType?: 'edit' | 'view'
  onClose?: () => void
  onInteractOutside?: (event: Event) => void
  open: boolean
  title?: string
} & ComponentProps<'div'>

export const Modal = ({
  children,
  closeButtonPosition = 'inside',
  modalType,
  onClose,
  onInteractOutside,
  open = false,
  title,
}: Props) => {
  const handleOpenChange = () => {
    onClose?.()
  }
  const resolvedClosePosition = modalType === 'view' ? 'outside' : closeButtonPosition

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={open}>
      <div>
        {open && (
          <Dialog.Portal>
            <Dialog.Overlay className={styles.modalOverlay} />
            {resolvedClosePosition === 'outside' && (
              <Dialog.Close
                className={styles.closeOutside}
                onClick={onClose}
                style={{ cursor: 'pointer' }}
              >
                <Close />
              </Dialog.Close>
            )}

            <div className={styles.modalWrapper}>
              <Dialog.Content
                aria-describedby={undefined}
                className={styles.modalContent}
                onInteractOutside={onInteractOutside}
              >
                <div>
                  {title ? (
                    <DialogTitle className={styles.title}>{title}</DialogTitle>
                  ) : (
                    <DialogTitle asChild>
                      <VisuallyHidden>Modal</VisuallyHidden>
                    </DialogTitle>
                  )}
                  {resolvedClosePosition === 'inside' && (
                    <Dialog.Close className={styles.closeInside} onClick={onClose}>
                      <Close />
                    </Dialog.Close>
                  )}
                  <Dialog.Description asChild className={styles.description}>
                    {children}
                  </Dialog.Description>
                </div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </div>
    </Dialog.Root>
  )
}
