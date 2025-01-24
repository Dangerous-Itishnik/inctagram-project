'use client'

import { Dispatch, SetStateAction, useState } from 'react'

import { AddPhotoModal } from '@/common/components/Modals/CreatePostModal/AddPhotoModal/AddPhotoModal'
import { CroppingModal } from '@/common/components/Modals/CreatePostModal/CroppingModal/CroppingModal'
import { PublicationModal } from '@/common/components/Modals/CreatePostModal/PublicationModal/PublicationModal'
import { CloseNotification } from '@/features/posts/ui/createPost/CloseNotification'
import useOutsideClick from '@/features/posts/ui/createPost/utils'

import styles from '@/features/posts/ui/createPost/CreatePost.module.scss'

type Props = {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
}

export const CreatePost = ({ active, setActive }: Props) => {
  const [images, setImages] = useState<string[]>([])
  const [step, setStep] = useState<number>(1)

  //TODO Нужен ли он!
  const [showCloseNotification, setShowCloseNotification] = useState(false)

  //TODO Если нужен то переименовать
  const { isActive, ref, setIsActive } = useOutsideClick(false)

  const deleteImage = (indexToDelete: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToDelete)

    setImages(updatedImages)
    if (updatedImages.length === 0) {
      setStep(1)
    }
  }

  if (!active) {
    return null
  }
  const publishedHandler = () => {
    setImages([])
    setActive(false)
    setStep(1)
  }

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 20 * 1024 * 1024
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']
    const MAX_IMAGE_COUNT = 10

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
        setImages(prevImages => [...prevImages, newImage])

        setStep(2)
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

  //TODO Нужна ли отдельная компонента
  const renderComponent = () => {
    if (step === 1) {
      return (
        <AddPhotoModal
          nextModalWindow={() => setStep(step + 1)}
          onClose={() => setActive(false)}
          onSelectFile={onSelectFile}
          open={active}
        />
      )
    }
    if (step === 2) {
      return (
        <CroppingModal
          images={images}
          nextModalWindow={() => setStep(step + 1)}
          onClose={() => setActive(false)}
          onDeleteImage={deleteImage}
          onSelectFile={onSelectFile}
          open={active}
          prevModalWindow={() => setStep(step - 1)}
        />
      )
    }
    if (step === 3) {
      return (
        <PublicationModal
          images={images}
          onClose={() => setActive(false)}
          open={active}
          prevModalWindow={() => setStep(step - 1)}
          publishedHandler={publishedHandler}
          setImages={setImages}
        />
      )
    }
  }

  //TODO Разобраться с выходом из модалки
  return (
    <div className={styles.modal} onClick={() => setIsActive(!isActive)} ref={ref}>
      <div onClick={e => e.stopPropagation()}>{renderComponent()}</div>
      {isActive && <CloseNotification onClose={() => setShowCloseNotification(false)} />}
    </div>
  )
}
