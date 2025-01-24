'use client'

import React, { useState } from 'react'

import { ImageOutline } from '@/assets/icons/components'
import { RadixModal } from '@/common/components/Modals/RadixModal/RadixModal'
import { Button } from '@/common/components/button'

import styles from '@/common/components/Modals/CreatePostModal/AddPhotoModal/AddPhotoModal.module.scss'

type Props = {
  onClose: () => void
  onImageUpload: (value: string) => void
  open: boolean
}

export const AddPhotoModal = ({ onClose, onImageUpload, open }: Props) => {
  //TODO надо ли это
  // const [uploadImage, setUploadImage] = useState<null | string>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const MAX_FILE_SIZE = 20 * 1024 * 1024
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']

  const triggerFileSelectPopup = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]

      if (selectedFile.size > MAX_FILE_SIZE) {
        alert('The size of picture is too large. Allowed size is equal 20mb')

        return
      }

      if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
        alert('Invalid file format. Please select an image in JPEG or PNG format.')

        return
      }
      if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
        alert('Invalid file format. Please select an image in JPEG or PNG format.')

        return
      }

      const reader = new FileReader()

      reader.onload = () => {
        const newImage = reader.result

        if (typeof newImage === 'string') {
          console.log('add Image')
          // setUploadImage(newImage)
          // handelImagesUpdate(newImage)
          onImageUpload(newImage)
        }
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <RadixModal modalTitle={'Add Photo'} onClose={onClose} open={open}>
      <div className={styles.window}>
        <div className={styles.cropper}>
          <div className={styles.logo}>
            <ImageOutline height={36} viewBox={'0 0 24 24'} width={36} />
            <input accept={'image/*'} onChange={onSelectFile} ref={inputRef} type={'file'} />
          </div>
          <div className={styles.buttons}>
            <Button onClick={triggerFileSelectPopup}>Select from Computer</Button>
            <Button variant={'outline'}>Open Draft</Button>
          </div>
        </div>
      </div>
    </RadixModal>
  )
}
