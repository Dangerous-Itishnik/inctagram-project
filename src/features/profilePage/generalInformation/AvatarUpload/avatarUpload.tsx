'use client'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { toast } from 'react-toastify'

import { CustomerSlider } from '@/common/components/Slider/slider'
import { Button } from '@/common/components/button'
import { Modal } from '@/features/posts/ui/postModalContent/Modal'
import { useRouter } from '@/i18n/navigation'
import { useSaveAvatarMutation } from '@/service/avatar/avatar.servise'
import { profileApi } from '@/service/profile/profile.servise'
import Image from 'next/image'

import styles from './avatarUpload.module.scss'

import DefaultImage from '../../../../../public/images/DefaultImage.jpg'
import getCroppedImg from './cropp'

type Props = {
  closeModal: () => void
  isOpen: boolean
}
export type CroppedAreaPixel = {
  height: number
  width: number
  x: number
  y: number
} | null

export const AvatarUpload = ({ closeModal, isOpen }: Props) => {
  const [imageSrc, setImageSrc] = useState<null | string>(null)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixel>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const [saveAvatar] = useSaveAvatarMutation()
  const [isButtonDisable, setButtonDisable] = useState(false)
  const { refresh } = useRouter()

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: CroppedAreaPixel) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const selectPhotoHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
  }

  const handleZoomIn = () => {
    setZoom(zoom + 0.1)
  }

  const handleZoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom - 0.1)
    }
  }

  const saveAv = async () => {
    setButtonDisable(true)
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)

    if (croppedImage) {
      try {
        const response = await fetch(croppedImage)

        if (!response.ok) {
          throw new Error(`Failed to fetch image. Status: ${response.status}`)
        }

        const blob = await response.blob()
        const croppedFile = new File([blob], 'cropped-image.jpg', { type: blob.type })

        saveAvatar({ profilePhoto: croppedFile }).unwrap()
        refresh()
        profileApi.util.invalidateTags(['Avatar', 'Profile'])
        toast.success('Avatar updated successfully!', {
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
          hideProgressBar: false,
          pauseOnHover: true,
          position: 'top-center',
        })
      } catch (error) {
        toast.error('Failed to update avatar', {
          autoClose: 3000,
          position: 'top-center',
        })
      }
    }
    closeModal()

    setImageSrc(null)
    setZoom(1)
    setButtonDisable(false)
  }

  const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]
      const acceptedTypes = ['image/jpeg', 'image/png']
      const maxSizeBytes = 10 * 1024 * 1024

      if (!acceptedTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload JPEG or PNG.', {
          autoClose: 3000,
          closeOnClick: true,
          hideProgressBar: false,
          pauseOnHover: true,
          position: 'top-center',
        })

        return
      }

      if (file.size > maxSizeBytes) {
        toast.error('File is too large. Maximum size is 10MB.', {
          autoClose: 3000,
          closeOnClick: true,
          hideProgressBar: false,
          pauseOnHover: true,
          position: 'top-center',
        })

        return
      }
      const imageDataUrl = await readFile(file)

      setImageSrc(imageDataUrl)
    }
  }

  const readFile = (file: File) => {
    return new Promise<string>(resolve => {
      const reader = new FileReader()

      reader.addEventListener('load', () => resolve(reader.result as string))
      reader.readAsDataURL(file)
    })
  }

  const size = {
    height: 250,
    width: 250,
  }

  const handleCloseModal = () => {
    closeModal()
    setImageSrc(null)
    setZoom(1)
  }

  return (
    <Modal
      onClose={handleCloseModal}
      open={isOpen}
      style={{ height: '564px', width: '492px' }}
      title={'Add Profile Photo'}
    >
      <div>
        <div>
          {imageSrc ? (
            <>
              <div className={styles.container}>
                <div className={styles.cropContainer}>
                  <Cropper
                    aspect={1}
                    crop={crop}
                    cropShape={'round'}
                    cropSize={size}
                    image={imageSrc}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    showGrid={false}
                    style={{
                      containerStyle: {
                        backgroundColor: '#171717',
                        backgroundPosition: 'center',
                      },
                      cropAreaStyle: {
                        border: 'none',
                      },
                    }}
                    zoom={zoom}
                  />
                  <div className={styles.utils}>
                    <Button className={styles.zoomPlus} onClick={handleZoomOut} variant={'link'}>
                      -
                    </Button>
                    <CustomerSlider onChange={handleZoomChange} values={[zoom]} />

                    <Button className={styles.zoomMinus} onClick={handleZoomIn} variant={'link'}>
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className={styles.button}>
                <Button disabled={isButtonDisable} onClick={saveAv} variant={'primary'}>
                  Save
                </Button>
              </div>
            </>
          ) : (
            <div className={styles.selectBox}>
              <div className={styles.defaultProfilePhotoBlock}>
                <Image alt={'avatar'} className={styles.img} src={DefaultImage} />
              </div>
              <Button onClick={selectPhotoHandler} variant={'primary'}>
                Select from Computer
              </Button>
            </div>
          )}
        </div>
        <input
          accept={'image/jpeg, image/png'}
          onChange={fileChange}
          ref={inputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </div>
    </Modal>
  )
}
