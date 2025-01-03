import { useEffect, useState } from 'react'

import { CreatePost } from '@/features/posts/ui/createPost/CreatePost'
import { Publication } from '@/features/posts/ui/createPost/Publication'
import { Slider } from '@/features/posts/ui/createPost/Slider'

import styles from '@/features/posts/ui/createPost/commonStyles.module.scss'

export const UploadFile = ({ image: initialImage, images, onClose, triggerFileSelectPopup }) => {
  const [image, setImage] = useState(initialImage)
  const [showAddPhoto, setShowAddPhoto] = useState<boolean>(false)
  const [openPublication, setOpenPublication] = useState<boolean>(false)

  const handelOpenAddPhoto = () => {
    setShowAddPhoto(true)
  }

  const handelOpenPublication = () => {
    setOpenPublication(true)
  }

  useEffect(() => {
    setImage(initialImage)
  }, [initialImage])

  return (
    // <div className={styles.window}>
    <div className={styles.test}>
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
            <button className={styles.next} onClick={handelOpenPublication} type={'button'}>
              Next
            </button>
          </div>
          <div className={styles.image}>
            {openPublication ? (
              <Publication images={images} />
            ) : (
              <Slider images={images} onOpenModal={triggerFileSelectPopup} />
            )}
          </div>
        </>
      )}
    </div>
  )
}
