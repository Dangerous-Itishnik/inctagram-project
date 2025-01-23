'use client'

import React, { useRef, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

import { Plug } from '@/assets/icons/plug'

import styles from '@/features/posts/ui/createPost/slider.module.scss'

type Props = {
  image: string
  images: string[]
  onDeleteImage: (value: number) => void
  onImageUpload: (value: string) => void
  triggerGoToCreatePost: () => void
  triggerGoToPublication: () => void
}
export const Slider = ({
  image: initialImage,
  images,
  onDeleteImage,
  onImageUpload,
  triggerGoToCreatePost,
  triggerGoToPublication,
}: Props) => {
  //TODO убрать лишнее
  // const [images2, setImages] = useState<[]>([])
  // const [uploadImage, setUploadImage] = useState<null | string>(null)
  const [image, setImage] = useState(initialImage)
  const [croppedAria, setCroppedAria] = useState<Area | null>(null)

  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)

  const MAX_FILE_SIZE = 20 * 1024 * 1024
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']
  //TODO
  // const MAX_IMAGE_COUNT = 10

  const triggerFileSelectPopup = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  // useEffect(() => {
  //   setImage(initialImage)
  // }, [initialImage])

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
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

        if (typeof newImage === 'string') {
          // setUploadImage(newImage)
          // handelImagesUpdate(newImage)
          onImageUpload(newImage)
        }
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  // const handelImagesUpdate = (newImage: string) => {
  //   images.length < MAX_IMAGE_COUNT
  //     ? setImages(prevImages => [...prevImages, newImage])
  //     : alert(`The maximum number of images has been reached (${MAX_IMAGE_COUNT}).`)
  // }

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
