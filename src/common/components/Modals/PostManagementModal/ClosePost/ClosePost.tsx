import { RadixModal } from '@/common/components/Modals/RadixModal/RadixModal'
import { Button } from '@/common/components/button'

import styles from '@/common/components/Modals/PostManagementModal/ClosePost/ClosePost.module.scss'

type Props = {
  closeEditModal: () => void
  onClose: () => void
  open: boolean
}

export const ClosePost = ({ closeEditModal, onClose, open }: Props) => {
  return (
    <RadixModal modalTitle={'Close Post'} onClose={onClose} open={open}>
      <div className={styles.closeWindow}>
        <div className={styles.message}>
          Do you really want to close the edition of the publication? If you close changes won’t be
          saved
        </div>
        <div className={styles.buttons}>
          <Button onClick={closeEditModal} variant={'outline'}>
            Yes
          </Button>
          <Button onClick={onClose} variant={'outline'}>
            No
          </Button>
        </div>
      </div>
    </RadixModal>
  )
}
