'use client'

import { ChangeEvent, useRef } from 'react'

import { ImageOutline } from '@/assets/icons/components'
import { RadixModal } from '@/common/components/Modals/RadixModal/RadixModal'
import { Button } from '@/common/components/button'

import styles from '@/common/components/Modals/CreatePostModal/AddPhotoModal/AddPhotoModal.module.scss'

type Props = {
  nextModalWindow: () => void
  onClose: () => void
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void
  open: boolean
  setIsModalInfo: () => void
}

export const AddPhotoModal = ({
  nextModalWindow,
  onClose,
  onSelectFile,
  open,
  setIsModalInfo,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const triggerAddPhoto = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }
  const addPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onSelectFile(e)
    nextModalWindow()
  }

  return (
    <RadixModal
      modalTitle={'Add Photo'}
      onClose={onClose}
      open={open}
      setIsModalInfo={setIsModalInfo}
    >
      <div className={styles.window}>
        <div className={styles.cropper}>
          <div className={styles.logo}>
            <ImageOutline height={36} viewBox={'0 0 24 24'} width={36} />
            <input accept={'image/*'} onChange={addPhotoHandler} ref={inputRef} type={'file'} />
          </div>
          <div className={styles.buttons}>
            <Button onClick={triggerAddPhoto}>Select from Computer</Button>
            <Button variant={'outline'}>Open Draft</Button>
          </div>
        </div>
      </div>
    </RadixModal>
  )
}
