'use client'

import { Dispatch, SetStateAction, useState } from 'react'

import { CloseNotification } from '@/features/posts/ui/createPost/CloseNotification'
import { CreatePost } from '@/features/posts/ui/createPost/CreatePost'
import { Publication } from '@/features/posts/ui/createPost/Publication'
import { Slider } from '@/features/posts/ui/createPost/Slider'
import useOutsideClick from '@/features/posts/ui/createPost/utils'

import styles from '@/features/posts/ui/createPost/modalPostWindow.module.scss'

const ModalComponents = {
  CREATE_POST: 'CREATE_POST',
  PUBLICATION: 'PUBLICATION',
  SLIDER: 'SLIDER',
}

type Props = {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
}

export const ModalPostWindow = ({ active, setActive }: Props) => {
  const [currentComponent, setCurrentComponent] = useState(ModalComponents.CREATE_POST)
  const [images, setImages] = useState<string[]>([])
  //TODO Нужен ли он!
  const [showCloseNotification, setShowCloseNotification] = useState(false)
  const { isActive, ref, setIsActive } = useOutsideClick(false)

  const handleButtonClick = () => {
    setIsActive(!isActive)
  }

  const deleteImage = (indexToDelete: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToDelete)

    setImages(updatedImages)
    if (updatedImages.length === 0) {
      setCurrentComponent(ModalComponents.CREATE_POST)
    }
  }

  const handleImageUpload = (newImage: string) => {
    setImages(prevImages => [...prevImages, newImage])
    setCurrentComponent(ModalComponents.SLIDER)
  }

  const followToCreatePost = () => {
    setCurrentComponent(ModalComponents.CREATE_POST)
  }

  const followToPublication = () => {
    setCurrentComponent(ModalComponents.PUBLICATION)
  }

  const followToSlider = () => {
    setCurrentComponent(ModalComponents.SLIDER)
  }

  const handleCloseNotification = () => {
    setShowCloseNotification(false)
  }

  if (!active) {
    return null
  }

  const renderComponent = () => {
    switch (currentComponent) {
      case ModalComponents.CREATE_POST:
        return <CreatePost onClose={() => setActive(false)} onImageUpload={handleImageUpload} />
      case ModalComponents.SLIDER:
        return (
          <Slider
            images={images}
            onDeleteImage={deleteImage}
            onImageUpload={handleImageUpload}
            triggerGoToCreatePost={followToCreatePost}
            triggerGoToPublication={followToPublication}
          />
        )
      case ModalComponents.PUBLICATION:
        return (
          <Publication images={images} slider={Slider} triggerGoToPublication={followToSlider} />
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.modal} onClick={handleButtonClick} ref={ref}>
      <div onClick={e => e.stopPropagation()}>{renderComponent()}</div>
      {isActive && <CloseNotification onClose={handleCloseNotification} />}
    </div>
  )
}
