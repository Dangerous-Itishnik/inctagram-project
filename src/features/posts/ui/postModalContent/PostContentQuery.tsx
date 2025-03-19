import { Dispatch, SetStateAction } from 'react'

import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { SwiperSlider } from '@/common/components/Swiper/SwiperSlider'
import { Button } from '@/common/components/button'
import { useModal } from '@/common/hooks/useModal'
import { storage } from '@/common/utils/storage'
import PostComments from '@/features/posts/ui/postModalContent/PostComments'
import { useRouter } from '@/i18n/navigation'
import { useGetPublicQuery, usePostDeleteMutation } from '@/service/posts/posts.service'
import Image from 'next/image'

import styles from './PostModal.module.scss'

import { PostEdit } from '../postEdit/PostEdit'
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
    postDelete(postId)
      .unwrap()
      .then(async () => {
        await new Promise(res => setTimeout(res, 500))
        closeDeleteModal()
        closeEditCloseModal()
        closePost()
        refresh()
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
            <div className={styles.contentView}>
              {data && (
                <div className={styles.modalHead}>
                  <PostModalHeader
                    isAuthenticated={isAuthenticated}
                    openDeleteModal={isAuthenticated ? openDeleteModal : undefined}
                    setModalType={isAuthenticated ? setModalType : undefined}
                    userName={data.userName}
                  />
                </div>
              )}
              <div className={styles.commentsContainer}>
                {data && <PostComments description={data.description} userName={data.userName} />}
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
                      height={320}
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
