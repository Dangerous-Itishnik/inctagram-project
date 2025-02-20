import React, { Dispatch, SetStateAction } from 'react'

import { SwiperSlider } from '@/common/components/Swiper/SwiperSlider'
import { Button } from '@/common/components/button'
import { useModal } from '@/common/hooks/useModal'
import { usePostDeleteMutation } from '@/service/posts/posts.service'
import Image from 'next/image'

import styles from './PostModal.module.scss'

import PostEdit from '../postEdit/PostEdit'
import PostComments from './PostComments'
import PostModalHeader from './PostModalHeader'

type Props = {
  closeEditCloseModal: () => void
  closeModal: () => void
  data
  handleCloseEditConfirmModal: () => void
  isEditModalOpen: boolean
  isPostEdit: boolean
  modalType: 'edit' | 'view'
  openEditCloseModal: () => void
  setIsPostEdit: Dispatch<SetStateAction<boolean>>
  setModalType: Dispatch<SetStateAction<'edit' | 'view'>>
}
export const PostContentQuery = ({
  closeEditCloseModal,
  closeModal,
  data,
  handleCloseEditConfirmModal,
  isEditModalOpen,
  isPostEdit,
  modalType,
  openEditCloseModal,
  setIsPostEdit,
  setModalType,
}: Props) => {
  //const { data } = useGetPostByIdQuery({postId});

  const [postDelete] = usePostDeleteMutation()

  const {
    closeModal: closeDeleteModal,
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
  } = useModal()

  const deletePost = (id: number) => {
    postDelete(id)
  }

  return (
    <>
      <Button onClick={() => deletePost}>x</Button>

      <div className={styles.content}>
        {modalType === 'view' ? (
          <>
            {data && (
              <div className={styles.modalHead}>
                <PostModalHeader
                  avatarOwner={data.avatarOwner}
                  openDeleteModal={openDeleteModal}
                  ownerId={data.ownerId}
                  setModalType={setModalType}
                  userName={data.userName}
                />
              </div>
            )}
            <div className={styles.contentTwo}>
              <div className={styles.imageContainer}>
                {data && <SwiperSlider imagesUrl={data.images} star={false} />}
              </div>
              <div className={styles.commentsContainer}>
                {data && (
                  <PostComments
                    avatarOwner={data.avatarOwner}
                    description={data.description}
                    id={data.id}
                    openDeleteModal={openDeleteModal}
                    ownerId={data.ownerId}
                    setModalType={setModalType}
                    updatedAt={data.updatedAt}
                    userName={data.userName}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          modalType === 'edit' && (
            <>
              <div className={styles.contentTwo}>
                <div>
                  {data && (
                    <Image
                      alt={'picture'}
                      className={styles.singleImage}
                      height={240}
                      priority
                      src={data.images[0].url}
                      width={320}
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

export default PostContentQuery
