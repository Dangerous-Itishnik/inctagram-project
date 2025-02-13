import { useState } from 'react'

import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { DeletePost } from '@/common/components/Modals/PostManagementModal/DeletePost/DeletePost'
import { EditPost } from '@/common/components/Modals/PostManagementModal/EditPost/EditPost'
import { PostOptions } from '@/common/components/Modals/PostManagementModal/PostOptions/PostOptions'
import { RadixModal } from '@/common/components/Modals/RadixModal/RadixModal'
import { Button } from '@/common/components/button'
import { ResponseUserPostData } from '@/service/posts/posts.service'

import styles from '@/common/components/Modals/PostManagementModal/PostManagement.module.scss'

type Props = {
  closePostManagement: () => void
  onClose: () => void
  open: boolean
  post: ResponseUserPostData
  refetchPosts: () => void
  setIsModalInfo: () => void
}

export const PostManagement = ({
  closePostManagement,
  onClose,
  open,
  post,
  refetchPosts,
}: Props) => {
  const [isModalInfo, setIsModalInfo] = useState<boolean>(false)
  const [isModalDelete, setIsModalDelete] = useState<boolean>(false)
  const [isPostOptions, setIsPostOptions] = useState<boolean>(false)
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const updatePostHandler = () => {
    setIsPostOptions(true)
  }

  const closeModalInfoHandler = () => {
    setIsModalInfo(false)
  }

  const showDeleteOptionModal = () => {
    setIsPostOptions(false)
    setIsModalDelete(true)
  }

  const showEditOptionModal = () => {
    setIsPostOptions(false)
    setIsModalEdit(true)
  }

  const closeModalDeleteHandler = () => {
    setIsModalDelete(false)
  }

  const closeEditModalHandler = () => {
    setIsModalEdit(false)
  }

  const goToPreviousSlide = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? post.images.length - 1 : prevIndex - 1))
  }

  const goToNextSlide = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === post.images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <RadixModal
      modalTitle={'Post Management'}
      onClose={onClose}
      open={open}
      setIsModalInfo={() => setIsModalInfo(true)}
    >
      <div className={styles.content}>
        <div className={styles.slider}>
          <div className={styles.sliderControls}>
            <Button onClick={goToPreviousSlide} type={'button'} variant={'icon'}>
              &lt;
            </Button>
            <Button onClick={goToNextSlide} type={'button'} variant={'icon'}>
              &gt;
            </Button>
          </div>
          <div
            className={styles.sliderPagination}
          >{`${currentImageIndex + 1}/${post.images.length}`}</div>
          {post && <img src={post.images[currentImageIndex]?.url} />}
        </div>
        <div className={styles.interaction}>
          <div className={styles.options}>
            <img alt={''} src={''} />
            <p>URLProfile</p>
            <Button onClick={updatePostHandler}>...</Button>
          </div>
          <div className={styles.postDescription}>
            <p>Post description</p>
            <textarea
              maxLength={500}
              onChange={() => {}}
              placeholder={'Text-area'}
              value={post.description}
            />
          </div>
        </div>
        {isPostOptions && (
          <PostOptions deleteOption={showDeleteOptionModal} updateOption={showEditOptionModal} />
        )}
        {isModalDelete && (
          <DeletePost
            closePostManagement={closePostManagement}
            onClose={closeModalDeleteHandler}
            open={isModalDelete}
            post={post}
            refetchPosts={refetchPosts}
          />
        )}
        {isModalEdit && (
          <EditPost
            closePostManagement={closePostManagement}
            onClose={closeEditModalHandler}
            open={isModalEdit}
            post={post}
            refetchPosts={refetchPosts}
          />
        )}
        {isModalInfo && (
          <InfoModal
            closePostManagement={closePostManagement}
            onClose={closeModalInfoHandler}
            open={isModalInfo}
          />
        )}
      </div>
    </RadixModal>
  )
}
