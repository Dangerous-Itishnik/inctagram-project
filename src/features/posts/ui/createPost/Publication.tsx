import { useState } from 'react'

import { usePostImageMutation, usePostPostMutation } from '@/service/posts/posts.service'

import styles from '@/features/posts/ui/createPost/publication.module.scss'

type Props = {
  images: string[]
  triggerGoToPublication: () => void
}

export const Publication = ({ images, triggerGoToPublication }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [publishedImage] = usePostImageMutation()
  const [publishedPost] = usePostPostMutation()

  const [description, setDescription] = useState('')

  const goToPreviousSlide = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNextSlide = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  function base64ToFile(base64: string, filename: string) {
    // Убираем префикс "data:image/png;base64,"
    const base64Data = base64.split(',')[1]

    if (!base64Data) {
      return null
    }
    // Преобразуем base64 в бинарные данные
    const byteCharacters = atob(base64Data)
    const byteArrays = []

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i))
    }

    const byteArray = new Uint8Array(byteArrays)
    const blob = new Blob([byteArray], { type: 'image/png' }) // Укажите правильный MIME-тип

    // Создаем объект File
    return new File([blob], filename, { type: 'image/png' })
  }

  const publishedPostHandler = () => {
    const formData = new FormData()

    images.forEach((base64, index) => {
      const file = base64ToFile(base64, `image${index}.png`)

      if (file) {
        formData.append('file', file) // 'file[]' — это ключ для массива файлов
      }
    })

    // Передаем массив файлов
    publishedImage(formData)
      .unwrap() // Используйте unwrap для обработки успешных и ошибочных ответов
      .then(res => {
        const data = {
          childrenMetadata: res.images.map(el => ({ uploadId: el.uploadId })),
          description,
        }

        publishedPost(data)
          .unwrap()
          .then(res => {
            console.log(res)
          })
      })
      .catch(err => {
        console.error('Error:', err)
      })
  }

  return (
    <div className={styles.publication}>
      <div className={styles.header}>
        <button onClick={triggerGoToPublication} type={'button'}>
          {'<'}
        </button>
        <h3>Publication</h3>
        <button className={styles.publish} onClick={publishedPostHandler} type={'button'}>
          Publish
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.slider}>
          {images.length > 0 ? (
            <img alt={`Slide ${currentImageIndex + 1}`} src={images[currentImageIndex]} />
          ) : (
            <>No images to display</>
          )}
          <div className={styles.sliderButtons}>
            <button onClick={goToPreviousSlide} type={'button'}>
              &lt;
            </button>
            <button onClick={goToNextSlide} type={'button'}>
              &gt;
            </button>
          </div>
          <div className={styles.imagePagination}>
            {images.length > 0 && `${currentImageIndex + 1}/${images.length}`}
          </div>
        </div>

        <div className={styles.userData}>
          <div className={styles.userAvatar}>
            <img />
            <p>URLProfile</p>
          </div>
          <div className={styles.userDescription}>
            <p>Add publication descriptions</p>
            <textarea
              onChange={e => setDescription(e.target.value)}
              placeholder={'Text-area'}
              value={description}
            />
            <span>0/500</span>
          </div>
          <div className={styles.userLocation}>
            <h3>Add location</h3>
            <span>New York </span>
            <p>New York </p>
            <span>Washington Square Park </span>
            <p>New York </p>
            <span>Washington Square Park </span>
          </div>
        </div>
      </div>
    </div>
  )
}
