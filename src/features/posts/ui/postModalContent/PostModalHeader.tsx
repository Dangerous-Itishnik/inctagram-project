import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import Trash from '@/assets/icons/components/Trash'
import { Dropdown, DropdownItem } from '@/common/components/Dropdown'
import { SmallAvatar } from '@/common/components/SmallAvatar/SmallAvatar'
import { Button } from '@/common/components/button'

import styles from './PostModal.module.scss'

type Props = {
  isAuthenticated?: boolean
  openDeleteModal?: () => void
  profileId: number
  setModalType?: (modalType: 'edit' | 'view') => void
  userName?: string
}
export const PostModalHeader = ({
  isAuthenticated,
  openDeleteModal,
  profileId,
  setModalType,
  userName,
}: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.avatarUser}>
        <SmallAvatar profileId={profileId} />
        <div>{userName}</div>
      </div>
      {isAuthenticated && (
        <div className={styles.menu}>
          <Dropdown align={'end'} trigger={<div className={styles.ellipse}>...</div>}>
            <DropdownItem>
              <Button onClick={() => (setModalType ? setModalType('edit') : '')} variant={'link'}>
                <Edit2Outline />
                Edit Post
              </Button>
            </DropdownItem>
            <DropdownItem>
              <Button onClick={openDeleteModal} variant={'link'}>
                <Trash />
                Delete Post
              </Button>
            </DropdownItem>
          </Dropdown>
        </div>
      )}
    </header>
  )
}
