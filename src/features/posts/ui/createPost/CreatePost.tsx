import React, { useState } from 'react'

import { Plug } from '@/assets/icons/plug'
import { CrossButton } from '@/common/components/CrossButton/CrossButton'
import { UploadFile } from '@/features/posts/ui/createPost/UploadFile'

import styles from '@/features/posts/ui/createPost/commonStyles.module.scss'

export const CreatePost = ({ onClose }) => {
  const [image, setImage] = useState(null)

  const inputRef = React.useRef()

  const triggerFileSelectPopup = () => inputRef.current.click()

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()

      reader.readAsDataURL(e.target.files[0])
      reader.addEventListener('load', () => {
        setImage(reader.result)
      })
    }
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
          {image ? (
            <>
              <UploadFile image={image} />
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
