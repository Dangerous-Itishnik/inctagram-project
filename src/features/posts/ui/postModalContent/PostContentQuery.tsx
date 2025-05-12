import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'

import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { SwiperSlider } from '@/common/components/Swiper/SwiperSlider'
import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import { useModal } from '@/common/hooks/useModal'
import { storage } from '@/common/utils/storage'
import { useRouter } from '@/i18n/navigation'
import { useGetPublicQuery, usePostDeleteMutation } from '@/service/posts/posts.service'
import Image from 'next/image'

import styles from './PostModal.module.scss'

import { PostEdit } from '../postEdit/PostEdit'
import { PostDescription } from './PostDescription'
import { PostModalHeader } from './PostModalHeader'

type Props = {
  closeEditCloseModal: () => void
  closePost: () => void
  isPostEdit: boolean
  modalType: 'edit' | 'view'
  openEditCloseModal: () => void
  postId: number
  setIsPostEdit: Dispatch<SetStateAction<boolean>>
  setModalType: Dispatch<SetStateAction<'edit' | 'view'>>
}
export const PostContentQuery = ({
  closeEditCloseModal,
  closePost,
  isPostEdit,
  modalType,
  openEditCloseModal,
  postId,
  setIsPostEdit,
  setModalType,
}: Props) => {
  const [isButtonDisable, setButtonDisable] = useState(false)
  const { data } = useGetPublicQuery(postId)

  const [postDelete] = usePostDeleteMutation()

  const isAuthenticated = !!storage.getToken()
  const { refresh } = useRouter()
  const {
    closeModal: closeDeleteModal,
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
  } = useModal()

  const deletePost = () => {
    setButtonDisable(true)
    try {
      postDelete(postId).unwrap()
      setButtonDisable(true)
      closeDeleteModal()
      closeEditCloseModal()
      closePost()
      refresh()
      toast.success('Post deleted successfully!', {
        autoClose: 3000,
        position: 'top-center',
      })
    } catch (error) {
      toast.error('Failed to delete post')
      setButtonDisable(false)
    } finally {
      setButtonDisable(false)
    }
  }

  return (
    <>
      {isAuthenticated && (
        <InfoModal
          modalTitle={'Delete Post'}
          onClose={closeDeleteModal}
          open={isDeleteOpen}
          style={{ height: '240px', width: '438px' }}
        >
          <div className={styles.deleteContainer}>
            <Typography variant={'body1'}>Are you sure you want to delete the photo?</Typography>
            <div className={styles.duo}>
              <Button onClick={deletePost} variant={'outline'}>
                YES
              </Button>
              <Button disabled={isButtonDisable} onClick={closeDeleteModal} variant={'primary'}>
                NO
              </Button>
            </div>
          </div>
        </InfoModal>
      )}
      <div className={styles.content}>
        {modalType === 'view' ? (
          <>
            <div className={styles.imageContainer}>
              {data && <SwiperSlider imagesUrl={data.images} start={false} />}
            </div>
            <div className={styles.contentView}>
              {data && (
                <div className={styles.modalHead}>
                  <PostModalHeader
                    isAuthenticated={isAuthenticated}
                    openDeleteModal={isAuthenticated ? openDeleteModal : undefined}
                    profileId={postId}
                    setModalType={isAuthenticated ? setModalType : undefined}
                    userName={data.userName}
                  />
                </div>
              )}
              <div className={styles.commentsContainer}>
                {data && (
                  <PostDescription
                    description={data.description}
                    profileId={postId}
                    userName={data.userName}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          modalType === 'edit' &&
          isAuthenticated && (
            <>
              <div className={styles.contentEdit}>
                <div>
                  {data?.images && (
                    <Image
                      alt={'picture'}
                      className={styles.singleImage}
                      height={500}
                      loading={'lazy'}
                      src={data.images[0].url}
                      width={400}
                    />
                  )}
                </div>
                <div className={styles.editContainer}>
                  {data && (
                    <PostEdit
                      avatarOwner={data.avatarOwner}
                      closeModal={openEditCloseModal}
                      description={data.description}
                      isPostEdit={isPostEdit}
                      ownerId={data.ownerId}
                      postId={data.id}
                      setIsPostEdit={setIsPostEdit}
                      setModalType={setModalType}
                      userName={data.userName}
                    />
                  )}
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  )
}
