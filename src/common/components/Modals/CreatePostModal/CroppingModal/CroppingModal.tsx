'use client'

import React, { useRef, useState } from 'react'
import Cropper from 'react-easy-crop'

import { ImageOutline } from '@/assets/icons/components'
import { RadixModal } from '@/common/components/Modals/RadixModal/RadixModal'
import { Button } from '@/common/components/button'

import styles from '@/common/components/Modals/CreatePostModal/CroppingModal/CroppingModal.module.scss'

type Props = {
  images: string[]
  nextModalWindow: () => void
  onClose: () => void
  onDeleteImage: (value: number) => void
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  open: boolean
  prevModalWindow: () => void
  setIsModalInfo: () => void
}
export const CroppingModal = ({
  images,
  nextModalWindow,
  onClose,
  onDeleteImage,
  onSelectFile,
  open,
  prevModalWindow,
  setIsModalInfo,
}: Props) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)

  const triggerFileSelectPopup = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
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

  const handleDeleteImage = () => {
    onDeleteImage(currentImageIndex)
  }

  const modalTitle = (
    <>
      <div className={styles.back}>
        <button onClick={prevModalWindow} type={'button'}>
          {'<'}
        </button>
      </div>
      <h3>Cropping</h3>
      <Button onClick={nextModalWindow} variant={'link'}>
        Next
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
      <div className={styles.image}>
        <div>
          <Cropper
            aspect={1}
            crop={crop}
            image={images[currentImageIndex]}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            zoom={zoom}
          />
        </div>
        <Button className={styles.deleteImage} onClick={handleDeleteImage}>
          X
        </Button>
        <div className={styles.sliderControls}>
          <Button onClick={goToPreviousSlide} type={'button'} variant={'icon'}>
            &lt;
          </Button>
          <Button onClick={goToNextSlide} type={'button'} variant={'icon'}>
            &gt;
          </Button>
        </div>
        <Button className={styles.outline} onClick={triggerFileSelectPopup}>
          <ImageOutline />
          <input accept={'image/*'} onChange={e => onSelectFile(e)} ref={inputRef} type={'file'} />
        </Button>
        <div className={styles.sliderPagination}>{`${currentImageIndex + 1}/${images.length}`}</div>
      </div>
    </RadixModal>
  )
}
