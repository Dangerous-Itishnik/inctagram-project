import BookmarkOutline from '@/assets/icons/components/BookmarkOutline'
import PaperPlaneOutline from '@/assets/icons/components/PaperPlaneOutline'
import LikeButton from '@/common/components/LikesButton/LikeButton'
import { SmallAvatar } from '@/common/components/SmallAvatar/SmallAvatar'
import { Typography } from '@/common/components/Typography'
import { PostLikesResponse } from '@/service/posts/post.type'

import styles from './postLikes.module.scss'

const PostLikes = ({
  data,
  isLiked,
  postId,
  refetch,
}: {
  data: PostLikesResponse
  isLiked: boolean
  postId: number
  refetch: () => void
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.icons}>
          <div className={styles.iconGroup}>
            <LikeButton isLiked={isLiked} postId={postId} refetch={refetch} />
            <PaperPlaneOutline />
          </div>
          <BookmarkOutline className={styles.rigth} />
        </div>
        <div className={styles.heart}>
          {data &&
            data?.items.slice(-3).map(item => {
              return <SmallAvatar key={item.id} profileId={item.id} />
            })}

          <Typography>{data?.items.length}</Typography>
          <Typography>{data?.items.length > 1 ? 'Likes' : 'Like'}</Typography>
        </div>
      </div>
    </>
  )
}

export default PostLikes
