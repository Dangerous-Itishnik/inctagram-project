'use client'
import { useState } from 'react'

import { Button } from '@/common/components/button'
import { useGetPostQuery } from '@/service/posts/posts.service'
import { ProfileUserResponse } from '@/service/publicUsers/publicUsers.service'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import styles from './OpenPostModal.module.scss'
type Props = {
  postId: number
  profileUser: ProfileUserResponse
}
export const OpenPostModal = ({ postId, profileUser }: Props) => {
  const { data } = useGetPostQuery({ postId })
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const goToPreviousSlide = () => {
    if (data?.images.length && data?.images.length !== 0) {
      setCurrentImageIndex(prevIndex => (prevIndex === 0 ? data.images.length - 1 : prevIndex - 1))
    }
  }
  const goToNextSlide = () => {
    if (data?.images.length) {
      setCurrentImageIndex(prevIndex => (prevIndex === data.images.length - 1 ? 0 : prevIndex + 1))
    }
  }

  const closePost = () => {
    const newParams = new URLSearchParams(searchParams.toString()) // Клонируем текущие параметры

    newParams.delete('postId')
    router.push(`?${newParams.toString()}`, { scroll: false }) // Обновляем URL с новыми параметрами
  }

  if (data) {
    return (
      <Dialog.Root onOpenChange={closePost} open={!!postId}>
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay className={styles.Overlay} />
          <Dialog.Content className={styles.Content}>
            <Dialog.Description asChild>
              <div className={styles.Description}>
                <div className={styles.slider}>
                  {data && data.images.length > 0 ? (
                    <div className={styles.imageWrapper}>
                      <Image
                        alt={`Slide ${currentImageIndex + 1}`}
                        className={styles.image}
                        height={data.images[currentImageIndex].height}
                        src={data.images[currentImageIndex].url}
                        width={data.images[currentImageIndex].width}
                      />
                    </div>
                  ) : (
                    <p>No images to display</p>
                  )}
                  {data.images.length > 1 && (
                    <div className={styles.sliderButtons}>
                      <Button onClick={goToPreviousSlide} variant={'link'}>
                        &lt;
                      </Button>
                      <Button onClick={goToNextSlide} variant={'link'}>
                        &gt;
                      </Button>
                    </div>
                  )}
                  <div className={styles.imagePagination}>
                    {data.images.length > 0 && `${currentImageIndex + 1}/${data.images.length}`}
                  </div>
                </div>
                <div>
                  <div className={styles.userInfo}>
                    {profileUser.avatars.length ? (
                      <Image
                        alt={'Avatar'}
                        height={profileUser.avatars[0].height}
                        src={profileUser.avatars[0].url}
                        width={profileUser.avatars[0].width}
                      />
                    ) : (
                      <div className={styles.noAvatar}>?</div>
                    )}
                    <h3>{profileUser.userName}</h3>
                  </div>
                </div>
              </div>
            </Dialog.Description>
            <Dialog.Close>
              <button onClick={closePost} type={'button'}>
                X
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }

  return 'yene'
}
