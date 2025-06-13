import { useState } from 'react'

import HeartOutline from '@/assets/icons/components/HeartOutline'
import { storage } from '@/common/utils/storage'
import { useUpDateStatusCommentMutation } from '@/service/comments/comments.servise'
import { HeartIcon } from '@storybook/icons'

const Likes = ({
  commentId,
  isLiked,
  postId,
}: {
  commentId: number
  isLiked: boolean
  postId: number
}) => {
  const [like, setLike] = useState<'LIKE' | 'NONE'>(isLiked ? 'LIKE' : 'NONE')
  const [updateStatusComment] = useUpDateStatusCommentMutation()
  const isAuthenticated = storage.getToken()

  const likeUpdate = async () => {
    if (!isAuthenticated) {
      return
    }

    const previousStatus = like
    const newStatus: 'LIKE' | 'NONE' = like === 'NONE' ? 'LIKE' : 'NONE'

    try {
      setLike(newStatus)

      await updateStatusComment({
        commentId,
        likeStatus: newStatus,
        postId,
      }).unwrap()
    } catch (error) {
      // Revert on error
      setLike(previousStatus)
      console.error('Failed to update like status:', error)
    }
  }

  return (
    <div>
      <button
        disabled={!isAuthenticated}
        onClick={likeUpdate}
        style={{ cursor: 'pointer' }}
        type={'button'}
      >
        {like === 'LIKE' ? <HeartIcon style={{ color: 'red' }} /> : <HeartOutline />}
      </button>
    </div>
  )
}

export default Likes
