import { ComponentPropsWithoutRef } from 'react'

import { RadixModal } from '@/common/components/Modals/RadixModal/RadixModal'
import { Button } from '@/common/components/button'
import { ResponseUserPostData, useDeleteUserPostMutation } from '@/service/posts/posts.service'

import styles from '@/common/components/Modals/PostManagementModal/DeletePost/DeletePost.module.scss'

type Props = {
  closePostManagement: () => void
  onClose: () => void
  open: boolean
  post: ResponseUserPostData
  refetchPosts: () => void
} & ComponentPropsWithoutRef<'div'>

export const DeletePost = ({ closePostManagement, onClose, open, post, refetchPosts }: Props) => {
  const [deletePostMutation] = useDeleteUserPostMutation()
  const postId = post.id

  const deletePostHandler = (postId: number) => {
    deletePostMutation(postId)
      .unwrap()
      .then(() => {
        closePostManagement()
        refetchPosts()
        onClose()
      })
  }

  return (
    <RadixModal modalTitle={'Delete Post'} onClose={onClose} open={open}>
      <div className={styles.deleteWindow}>
        <div className={styles.message}>Are you sure want to delete this post?</div>
        <div className={styles.buttons}>
          <Button onClick={() => deletePostHandler(postId)} variant={'outline'}>
            Yes
          </Button>
          <Button
            onClick={() => {
              onClose()
            }}
            variant={'outline'}
          >
            No
          </Button>
        </div>
      </div>
    </RadixModal>
  )
}
