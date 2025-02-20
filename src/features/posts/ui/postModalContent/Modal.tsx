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
  isAuthenticated: boolean
  isHeaderDisabled?: boolean
  onClose?: () => void
  onInteractOutside?: (event: Event) => void
  open: boolean
  title?: string
} & ComponentProps<'div'>

export const Modal = ({
  children,
  closeButton,
  onClose,
  onInteractOutside,
  open = false,
  title,
}: Props) => {
  const handleOpenChange = () => {
    onClose?.()
  }

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={open}>
      <div>
        {open && (
          <Dialog.Portal>
            <Dialog.Overlay className={styles.modalOverlay} />
            <Dialog.Content className={styles.modalContent} onInteractOutside={onInteractOutside}>
              <div>
                {closeButton && (
                  <div>
                    <Dialog.Close onClick={onClose}>
                      <Close />
                    </Dialog.Close>
                  </div>
                )}
                <DialogTitle>{title}</DialogTitle>
                <Dialog.Description asChild>{children}</Dialog.Description>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </div>
    </Dialog.Root>
  )
}
