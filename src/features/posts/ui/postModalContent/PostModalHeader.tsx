import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import Trash from '@/assets/icons/components/Trash'
import { Dropdown, DropdownItem } from '@/common/components/Dropdown'
import { Button } from '@/common/components/button'
import Link from 'next/link'

import styles from './PostModal.module.scss'

type Props = {
  isAuthenticated?: boolean
  openDeleteModal?: () => void
  setModalType?: (modalType: 'edit' | 'view') => void
  userName?: string
}
export const PostModalHeader = ({
  isAuthenticated,
  openDeleteModal,
  setModalType,
  userName,
}: Props) => {
  return (
    <header className={styles.header}>
      <div>{userName}</div>
      {isAuthenticated && (
        <div className={styles.menu}>
          <Dropdown align={'end'} trigger={<div className={styles.ellipse}>...</div>}>
            <DropdownItem>
              <Button
                className={styles.btn}
                onClick={() => (setModalType ? setModalType('edit') : '')}
                variant={'link'}
              >
                <Edit2Outline />
                Edit Post
              </Button>
            </DropdownItem>
            <DropdownItem>
              <Button className={styles.btn} onClick={openDeleteModal} variant={'link'}>
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
