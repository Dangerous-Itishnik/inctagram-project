import { useState } from 'react'

import HeartOutline from '@/assets/icons/components/HeartOutline'
import { storage } from '@/common/utils/storage'
import { usePostLikesMutation } from '@/service/posts/posts.service'
import { HeartIcon } from '@storybook/icons'

const LikeButton = ({
  isLiked,
  postId,
  refetch,
}: {
  isLiked: boolean
  postId: number
  refetch: () => void
}) => {
  const [postLikes] = usePostLikesMutation()
  const [like, setLike] = useState<'LIKE' | 'NONE'>(isLiked ? 'LIKE' : 'NONE')
  const isAuthenticated = storage.getToken()

  const likeUpdate = async () => {
    if (!isAuthenticated) {
      return
    }
    const previousStatus = like
    const newStatus: 'LIKE' | 'NONE' = like === 'NONE' ? 'LIKE' : 'NONE'

    try {
      setLike(newStatus)

      await postLikes({
        likeStatus: newStatus,
        postId,
      }).unwrap()
      refetch()
    } catch (error) {
      setLike(previousStatus)
      console.error('Failed to update like status:', error)
    }
  }

  return isAuthenticated ? (
    <button onClick={likeUpdate} style={{ cursor: 'pointer' }} type={'button'}>
      {like === 'LIKE' ? <HeartIcon style={{ color: 'red' }} /> : <HeartOutline />}
    </button>
  ) : null
}

export default LikeButton
