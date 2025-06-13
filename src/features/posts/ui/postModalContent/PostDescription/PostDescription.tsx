import PublishButton from '@/common/components/PublishButton/PublishButton'
import { SmallAvatar } from '@/common/components/SmallAvatar/SmallAvatar'
import { Typography } from '@/common/components/Typography'
import Comments from '@/features/posts/ui/postModalContent/Comments/Comments'
import PostLikes from '@/features/posts/ui/postModalContent/Likes/PostLikes'
import { useGetPostLikesQuery } from '@/service/posts/posts.service'

import styles from './postDescription.module.scss'

type Props = {
  description: string
  postId: number
  profileId: number
  userName: string
}
export const PostDescription = ({ description, postId, profileId, userName }: Props) => {
  const { data, refetch } = useGetPostLikesQuery(postId)

  const isLiked = data?.items.some(like => like.userId === profileId) || false

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.comments}>
        <SmallAvatar profileId={profileId} />
        <Typography variant={'body1'}>{userName}</Typography>
        <Typography className={styles.text} variant={'body2'}>
          {description}
        </Typography>
      </div>
      <Comments postId={postId} />
      <PostLikes data={data!} isLiked={isLiked} postId={postId} refetch={refetch} />
      <div>
        <PublishButton postId={postId} />
      </div>
    </div>
  )
}
export default PostDescription
