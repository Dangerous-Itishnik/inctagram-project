import { useState } from 'react'

import styles from '@/features/posts/ui/createPost/publication.module.scss'

export const Publication = ({ images, triggerGoToPublication }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const goToPreviousSlide = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNextSlide = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className={styles.publication}>
      <div className={styles.header}>
        <button onClick={triggerGoToPublication} type={'button'}>
          {'<'}
        </button>
        <h3>Publication</h3>
        <button className={styles.publish} type={'button'}>
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
            <textarea placeholder={'Text-area'} />
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
