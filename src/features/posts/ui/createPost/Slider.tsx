import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

import { Plug } from '@/assets/icons/plug'

import styles from '@/features/posts/ui/createPost/slider.module.scss'
import {UploadFile} from "@/features/posts/ui/createPost/UploadFile";

export const Slider = ({ images, onOpenModal }) => {
  const [croppedAria, setCroppedAria] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  console.log(images)

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAria(croppedAreaPixels)
  }

  const handlerZoomOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZoom = parseFloat(e.target.value)

    setZoom(newZoom)
  }

  const goToPreviousSlide = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNextSlide = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  if (!images || images.length === 0) {
    return <div>No images to display</div>
  }

  if (currentImageIndex < 0 || currentImageIndex >= images.length) {
    setCurrentImageIndex(0)
  }

  return (
    <div>
      <div>
        <Cropper
          aspect={1}
          crop={crop}
          image={images[currentImageIndex]}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          zoom={zoom}
        />
        <input
          aria-labelledby={'Zoom'}
          max={3}
          min={1}
          onChange={handlerZoomOnChange}
          step={0.1}
          type={'range'}
          value={zoom}
        />
      </div>
      <div className={styles.sliderControls}>
        <button onClick={goToPreviousSlide} type={'button'}>
          &lt;
        </button>
        <button onClick={goToNextSlide} type={'button'}>
          &gt;
        </button>
      </div>
      <div className={styles.outline}>
        <Plug onclick={onOpenModal} />
      </div>
      <div className={styles.sliderPagination}>{`${currentImageIndex + 1}/${images.length}`}</div>
    </div>
  )
}
