import React, { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'

import { BackButton } from '@/common/components/BackBotton/BackButton'

import styles from '@/features/posts/ui/createPost/commonStyles.module.scss'

export const UploadFile = ({ image: initialImage, onClose }) => {
  const [image, setImage] = useState(initialImage)
  const [croppedAria, setCroppedAria] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAria(croppedAreaPixels)
  }

  const handlerZoomOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZoom = parseFloat(e.target.value)

    setZoom(newZoom)
  }

  useEffect(() => {
    setImage(initialImage)
  }, [initialImage])

  return (
    <div className={styles.window}>
      <div className={styles.headerCropping}>
        <div className={styles.back}>
          <BackButton title={''} />
        </div>
        <h3>Cropping</h3>
        <button className={styles.next} onClick={onClose} type={'button'}>
          Next
        </button>
      </div>
      <div className={styles.image}>
        <Cropper
          aspect={1}
          crop={crop}
          image={image}
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
      <div className={styles.slider}></div>
    </div>
  )
}
