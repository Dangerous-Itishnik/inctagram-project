import { useEffect, useState } from 'react'

import { CreatePost } from '@/features/posts/ui/createPost/CreatePost'
import { Slider } from '@/features/posts/ui/createPost/Slider'

import styles from '@/features/posts/ui/createPost/commonStyles.module.scss'

export const UploadFile = ({ image: initialImage, images, onClose, triggerFileSelectPopup }) => {
  const [image, setImage] = useState(initialImage)
  const [showAddPhoto, setAddPhoto] = useState(false)

  const handelOpenAddPhoto = () => {
    setAddPhoto(true)
  }

  useEffect(() => {
    setImage(initialImage)
  }, [initialImage])

  return (
    <div className={styles.window}>
      {showAddPhoto ? (
        <CreatePost onClose={onClose} />
      ) : (
        <>
          <div className={styles.headerCropping}>
            <div className={styles.back}>
              <button onClick={handelOpenAddPhoto} type={'button'}>
                {'<'}
              </button>
            </div>
            <h3>Cropping</h3>
            <button className={styles.next} onClick={onClose} type={'button'}>
              Next
            </button>
          </div>
          <div className={styles.image}>
            <Slider images={images} onOpenModal={triggerFileSelectPopup} />
          </div>
        </>
      )}
    </div>
  )
}
