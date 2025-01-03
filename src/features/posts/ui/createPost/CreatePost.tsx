import React, { useState } from 'react'

import { Plug } from '@/assets/icons/plug'
import { CrossButton } from '@/common/components/CrossButton/CrossButton'
import { UploadFile } from '@/features/posts/ui/createPost/UploadFile'

import styles from '@/features/posts/ui/createPost/commonStyles.module.scss'

export const CreatePost = ({ onClose }) => {
  const [uploadImage, setUploadImage] = useState(null)
  const [images, setImages] = useState([])

  const MAX_FILE_SIZE = 20 * 1024 * 1024
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']
  const MAX_IMAGE_COUNT = 10

  const inputRef = React.useRef()

  const triggerFileSelectPopup = () => inputRef.current.click()

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

        setUploadImage(newImage)
        handelImagesUpdate(newImage)
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handelImagesUpdate = newImage => {
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
          {uploadImage ? (
            <>
              <UploadFile
                images={images}
                onClose={onClose}
                onImageUpload={handelImagesUpdate}
                triggerFileSelectPopup={triggerFileSelectPopup}
              />
            </>
          ) : null}
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
