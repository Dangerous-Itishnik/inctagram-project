'use client'

import React, { useState } from 'react'

import { Plug } from '@/assets/icons/plug'
import { CrossButton } from '@/common/components/CrossButton/CrossButton'

import styles from '@/features/posts/ui/createPost/cretePost.module.scss'

type Props = {
  onClose: () => void
  onImageUpload: (value: string) => void
}

export const CreatePost = ({ onClose, onImageUpload }: Props) => {
  //TODO надо ли это
  const [uploadImage, setUploadImage] = useState<null | string>(null)
  const [images, setImages] = useState<string[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  const MAX_FILE_SIZE = 20 * 1024 * 1024
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']
  const MAX_IMAGE_COUNT = 10

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

      const reader = new FileReader()

      reader.onload = () => {
        const newImage = reader.result

        if (typeof newImage === 'string') {
          setUploadImage(newImage)
          handelImagesUpdate(newImage)
          onImageUpload(newImage)
        }
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handelImagesUpdate = (newImage: string) => {
    images.length < MAX_IMAGE_COUNT
      ? setImages(prevImages => [...prevImages, newImage])
      : alert(`The maximum number of images has been reached (${MAX_IMAGE_COUNT}).`)
  }

  return (
    <div className={styles.window}>
      <div className={styles.headerPhoto}>
        <h3>Add Photo</h3>
        <div>
          <CrossButton onClose={onClose} />
        </div>
      </div>
      <div className={styles.cropper}>
        <div className={styles.logo}>
          <div className={styles.plug}>
            <Plug />
          </div>
          <input accept={'image/*'} onChange={onSelectFile} ref={inputRef} type={'file'} />
        </div>
        <button onClick={triggerFileSelectPopup} type={'button'}>
          Select from Computer
        </button>
        <button type={'button'}>Open Draft</button>
      </div>
    </div>
  )
}
