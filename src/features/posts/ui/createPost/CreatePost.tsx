'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'

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
  const MAX_IMAGE_COUNT = 10

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
  const MAX_FILE_SIZE = 20 * 1024 * 1024
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]

      // Проверка размера файла
      if (selectedFile.size > MAX_FILE_SIZE) {
        alert('The size of the picture is too large. Allowed size is 20MB.')

        return
      }

      // Проверка формата файла
      if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
        alert('Invalid file format. Please select an image in JPEG or PNG format.')

        return
      }

      // Проверка на максимальное количество файлов
      if (images.length >= MAX_IMAGE_COUNT) {
        alert(`You can only upload up to ${MAX_IMAGE_COUNT} images.`)

        return
      }

      // Чтение файла с использованием промисов
      const newImage = await readFileAsDataURL(selectedFile)

      // Обновление состояния
      if (newImage) {
        handleImageUpload(newImage)
      }

      // Очистка input
      e.target.value = ''
    }
  }

  // Функция для чтения файла как Data URL
  const readFileAsDataURL = (file: File): Promise<null | string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('Failed to read file as Data URL.'))
        }
      }

      reader.onerror = () => {
        reject(new Error('Failed to read file.'))
      }

      reader.readAsDataURL(file)
    })
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
            onSelectFile={onSelectFile}
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
            setImages={setImages}
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
