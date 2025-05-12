import { useState } from 'react'

import { RadixModal } from '@/common/components/Modals/RadixModal/RadixModal'
import { Button } from '@/common/components/button'
import { usePostImageMutation, usePostPostMutation } from '@/service/posts/posts.service'
import Image from 'next/image'

import styles from '@/common/components/Modals/CreatePostModal/PublicationModal/publication.module.scss'
type Props = {
  images: string[]
  onClose: () => void
  open: boolean
  prevModalWindow: () => void
  publishedHandler: () => void
  setIsModalInfo: () => void
}

export const PublicationModal = ({
  images,
  onClose,
  open,
  prevModalWindow,
  publishedHandler,

  setIsModalInfo,
}: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [publishedImage] = usePostImageMutation()
  const [publishedPost] = usePostPostMutation()

  const goToPreviousSlide = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }
  const goToNextSlide = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const base64ToFile = (base64: string, filename: string) => {
    const base64Data = base64.split(',')[1]

    if (!base64Data) {
      return null
    }

    const byteCharacters = atob(base64Data)
    const byteArrays = []

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i))
    }

    const byteArray = new Uint8Array(byteArrays)
    const blob = new Blob([byteArray], { type: 'image/png' })

    return new File([blob], filename, { type: 'image/png' })
  }

  const publishedPostHandler = () => {
    setIsLoading(true)
    const formData = new FormData()

    images.forEach((base64, index) => {
      const file = base64ToFile(base64, `image${index}.png`)

      if (file) {
        formData.append('file', file)
      }
    })

    publishedImage(formData)
      .unwrap()
      .then(res => {
        const data = {
          childrenMetadata: res.images.map(el => ({ uploadId: el.uploadId })),
          description,
        }

        publishedPost(data)
          .unwrap()
          .then(() => {
            publishedHandler()
          })
          .catch(console.error)
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
      })
  }

  const modalTitle = (
    <>
      <button onClick={prevModalWindow} type={'button'}>
        {'<'}
      </button>
      <h3>Publication</h3>
      <Button disabled={isLoading} onClick={publishedPostHandler} variant={'link'}>
        Publish
      </Button>
    </>
  )

  return (
    <RadixModal
      modalTitle={modalTitle}
      onClose={onClose}
      open={open}
      setIsModalInfo={setIsModalInfo}
    >
      <div className={styles.content}>
        <div className={styles.slider}>
          {images.length > 0 ? (
            <div className={styles.imageWrapper}>
              <Image alt={`Slide ${currentImageIndex + 1}`} fill src={images[currentImageIndex]} />
            </div>
          ) : (
            <p>No images to display</p>
          )}
          <div className={styles.sliderButtons}>
            <Button onClick={goToPreviousSlide} variant={'link'}>
              &lt;
            </Button>
            <Button onClick={goToNextSlide} variant={'link'}>
              &gt;
            </Button>
          </div>
          <div className={styles.imagePagination}>
            {images.length > 0 && `${currentImageIndex + 1}/${images.length}`}
          </div>
        </div>
        <div className={styles.userData}>
          <div className={styles.userAvatar}>
            <Image alt={'User Avatar'} height={36} src={'/images/avatar.png'} width={36} />
            <p>URLProfile</p>
          </div>
          <div className={styles.userDescription}>
            <p>Add publication descriptions</p>
            <textarea
              maxLength={500}
              onChange={e => setDescription(e.target.value)}
              placeholder={'Text-area'}
              value={description}
            />
            <span>{description.length}/500</span>
          </div>
          <div className={styles.userLocation}>
            <h3>Add location</h3>
            <span>New York</span>
            <p>Washington Square Park</p>
          </div>
        </div>
      </div>
    </RadixModal>
  )
}
