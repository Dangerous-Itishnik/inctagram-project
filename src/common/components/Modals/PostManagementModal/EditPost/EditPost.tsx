import { useState } from 'react'

import { ClosePost } from '@/common/components/Modals/PostManagementModal/ClosePost/ClosePost'
import { RadixModal } from '@/common/components/Modals/RadixModal/RadixModal'
import { Button } from '@/common/components/button'
import { ResponseUserPostData, useUpdateUserPostMutation } from '@/service/posts/posts.service'

import styles from '@/common/components/Modals/PostManagementModal/EditPost/EditPost.module.scss'

type Props = {
  closeEditModal: () => void
  closePostManagement: () => void
  onClose: () => void
  open: boolean
  post: ResponseUserPostData
  refetchPosts: () => void
}

export const EditPost = ({
  closeEditModal,
  closePostManagement,
  onClose,
  open,
  post,
  refetchPosts,
}: Props) => {
  const [isClosePost, setIsClosePost] = useState(false)
  const [postDescription, setPostDescription] = useState<string>(post.description)
  const [updatePost] = useUpdateUserPostMutation()

  const updatePostHandler = (post: { description: string; id: number }) => {
    updatePost({ description: post.description, id: post.id }).then(() => {
      closePostManagement()
      onClose()
      refetchPosts()
    })
  }

  const closeEditPostHandler = () => {
    setIsClosePost(false)
    closeEditModal()
  }

  return (
    <RadixModal
      modalTitle={'Edit Post'}
      onClose={onClose}
      open={open}
      setIsModalInfo={() => setIsClosePost(true)}
    >
      <div className={styles.content}>
        <div className={styles.slider}>{post && <img src={post.images[0]?.url} />}</div>
        <div className={styles.interaction}>
          <div className={styles.options}>
            <img alt={''} src={''} />
            <p>URLProfile</p>
          </div>
          <div className={styles.postDescription}>
            <p>Add publication description</p>
            <textarea
              maxLength={500}
              onChange={e => setPostDescription(e.target.value)}
              placeholder={'Text-area'}
              value={postDescription}
            />
            <span>{postDescription.length}/500</span>
            <Button
              onClick={() => updatePostHandler({ description: postDescription, id: post.id })}
            >
              Save Changes
            </Button>
          </div>
        </div>
        {isClosePost && (
          <ClosePost
            closeEditModal={closeEditPostHandler}
            closePostManagement={closePostManagement}
            onClose={() => setIsClosePost(false)}
            open={isClosePost}
          />
        )}
      </div>
    </RadixModal>
  )
}
