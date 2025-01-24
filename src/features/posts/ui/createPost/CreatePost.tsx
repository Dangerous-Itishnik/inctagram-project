'use client'

import { Dispatch, SetStateAction, useState } from 'react'

import { AddPhotoModal } from '@/common/components/Modals/CreatePostModal/AddPhotoModal/AddPhotoModal'
import { CroppingModal } from '@/common/components/Modals/CreatePostModal/CroppingModal/CroppingModal'
import { PublicationModal } from '@/common/components/Modals/CreatePostModal/PublicationModal/PublicationModal'
import { CloseNotification } from '@/features/posts/ui/createPost/CloseNotification'
import useOutsideClick from '@/features/posts/ui/createPost/utils'

import styles from '@/features/posts/ui/createPost/CreatePost.module.scss'

const ModalComponents = {
  CREATE_POST: 'CREATE_POST',
  PUBLICATION: 'PUBLICATION',
  SLIDER: 'SLIDER',
}

type Props = {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
}

export const CreatePost = ({ active, setActive }: Props) => {
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
        return (
          <AddPhotoModal
            onClose={() => setActive(false)}
            onImageUpload={handleImageUpload}
            open={currentComponent === ModalComponents.CREATE_POST}
          />
        )
      case ModalComponents.SLIDER:
        return (
          <CroppingModal
            images={images}
            onClose={() => setActive(false)}
            onDeleteImage={deleteImage}
            onImageUpload={handleImageUpload}
            open={currentComponent === ModalComponents.SLIDER}
            triggerGoToCreatePost={followToCreatePost}
            triggerGoToPublication={followToPublication}
          />
        )
      case ModalComponents.PUBLICATION:
        return (
          <PublicationModal
            images={images}
            onClose={() => setActive(false)}
            open={currentComponent === ModalComponents.PUBLICATION}
            triggerGoToPublication={followToSlider}
          />
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
