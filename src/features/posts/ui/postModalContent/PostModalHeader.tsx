import React from 'react'

import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import Trash from '@/assets/icons/components/Trash'
import { Dropdown, DropdownItem } from '@/common/components/Dropdown'
import { Button } from '@/common/components/button'

import styles from './PostModal.module.scss'

type Props = {
  openDelete?: () => void
  setModalType?: (modalType: 'edit' | 'view') => void
  userName: string
}
const PostModalHeader = ({ openDelete, setModalType, userName }: Props) => {
  return (
    <header className={styles.header}>
      <div>userName: {userName}</div>
      {
        <div className={styles.menu}>
          <Dropdown align={'end'} trigger={<div className={styles.ellipse}>...</div>}>
            <DropdownItem>
              <Button onClick={() => (setModalType ? setModalType('edit') : '')} variant={'link'}>
                <Edit2Outline />
                Edit
              </Button>
            </DropdownItem>
            <DropdownItem>
              <Button onClick={() => (openDelete ? openDelete() : '')} variant={'link'}>
                <Trash />
                Delete
              </Button>
            </DropdownItem>
          </Dropdown>
        </div>
      }
    </header>
  )
}

export default PostModalHeader
