import { Dispatch, SetStateAction } from 'react'

import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { SwiperSlider } from '@/common/components/Swiper/SwiperSlider'
import { Button } from '@/common/components/button'
import { useModal } from '@/common/hooks/useModal'
import { storage } from '@/common/utils/storage'
import { useGetPublicQuery, usePostDeleteMutation } from '@/service/posts/posts.service'
import Image from 'next/image'

import styles from './PostModal.module.scss'

import { PostEdit } from '../postEdit/PostEdit'
import PostComments from './PostComments'
import { PostModalHeader } from './PostModalHeader'

type Props = {
  closeEditCloseModal: () => void
  closePost: () => void
  handleCloseEditConfirmModal: () => void
  isEditModalOpen: boolean
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
  handleCloseEditConfirmModal,
  isEditModalOpen,
  isPostEdit,
  modalType,
  openEditCloseModal,
  postId,
  setIsPostEdit,
  setModalType,
}: Props) => {
  const { data } = useGetPublicQuery(postId)

  const [postDelete] = usePostDeleteMutation()

  const isAuthenticated = !!storage.getToken()

  const {
    closeModal: closeDeleteModal,
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
  } = useModal()

  const deletePost = () => {
    postDelete(postId)
      .unwrap()
      .then(async () => {
        await new Promise(res => setTimeout(res, 500))
        closeDeleteModal()
        closeEditCloseModal()
        closePost()
      })
  }

  return (
    <>
      {isAuthenticated && (
        <InfoModal modalTitle={'DELETE POST'} onClose={closeDeleteModal} open={isDeleteOpen}>
          <div className={styles.btn}>
            <Button onClick={deletePost} variant={'outline'}>
              YES
            </Button>

            <Button onClick={closeDeleteModal} variant={'primary'}>
              NO
            </Button>
          </div>
        </InfoModal>
      )}
      <div className={styles.content}>
        {modalType === 'view' ? (
          <>
            <div className={styles.imageContainer}>
              {data && <SwiperSlider imagesUrl={data.images} star={false} />}
            </div>
            <div className={styles.contentTwo}>
              {data && (
                <div className={styles.modalHead}>
                  <PostModalHeader
                    avatarOwner={data.avatarOwner}
                    isAuthenticated={isAuthenticated}
                    openDeleteModal={isAuthenticated ? openDeleteModal : undefined}
                    ownerId={data.ownerId}
                    setModalType={isAuthenticated ? setModalType : undefined}
                    userName={data.userName}
                  />
                </div>
              )}
              <div className={styles.commentsContainer}>
                {data && (
                  <PostComments
                    avatarOwner={data.avatarOwner}
                    description={data.description}
                    id={data.id}
                    openDeleteModal={isAuthenticated ? openDeleteModal : undefined}
                    ownerId={data.ownerId}
                    setModalType={isAuthenticated ? setModalType : undefined}
                    updatedAt={data.updatedAt}
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
              <div className={styles.contentTwo}>
                <div>
                  {data.images && (
                    <Image
                      alt={'picture'}
                      className={styles.singleImage}
                      height={320}
                      src={data.images[0].url}
                      width={400}
                    />
                  )}
                </div>
                <div className={styles.commentsContainer}>
                  {data && (
                    <PostEdit
                      avatarOwner={data.avatarOwner}
                      closeEditCloseModal={closeEditCloseModal}
                      closeModal={openEditCloseModal}
                      description={data.description}
                      handleCloseEditConfirmModal={handleCloseEditConfirmModal}
                      isEditModalOpen={isEditModalOpen}
                      isPostEdit={isPostEdit}
                      modalType={modalType}
                      openEditCloseModal={openEditCloseModal}
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
