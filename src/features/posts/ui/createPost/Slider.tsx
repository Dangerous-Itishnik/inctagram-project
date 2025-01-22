'use client'

import React, { useEffect, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'

import { Plug } from '@/assets/icons/plug'

import styles from '@/features/posts/ui/createPost/slider.module.scss'

export const Slider = ({
  onDeleteImage,
  image: initialImage,
  images,
  onImageUpload,
  triggerGoToCreatePost,
  triggerGoToPublication,
}) => {
  const [image, setImage] = useState(initialImage)
  const [croppedAria, setCroppedAria] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  //
  const [images2, setImages] = useState([])
  const [uploadImage, setUploadImage] = useState(null)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const inputRef = useRef(null)

  const MAX_FILE_SIZE = 20 * 1024 * 1024
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']
  const MAX_IMAGE_COUNT = 10

  const triggerFileSelectPopup = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  useEffect(() => {
    setImage(initialImage)
  }, [initialImage])

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAria(croppedAreaPixels)
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
        onImageUpload(newImage)
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
      <div className={styles.headerCropping}>
        <div className={styles.back}>
          <button onClick={triggerGoToCreatePost} type={'button'}>
            {'<'}
          </button>
        </div>
        <h3>Cropping</h3>
        <button className={styles.next} onClick={triggerGoToPublication} type={'button'}>
          Next
        </button>
      </div>
      <div className={styles.image}>
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
        </div>
        <div className={styles.deleteImage}>
          <button onClick={handleDeleteImage} type={'button'}>
            X
          </button>
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
          <Plug onClick={triggerFileSelectPopup} />
          <input accept={'image/*'} onChange={onSelectFile} ref={inputRef} type={'file'} />
        </div>
        <div className={styles.sliderPagination}>{`${currentImageIndex + 1}/${images.length}`}</div>
      </div>
    </div>
  )
}
