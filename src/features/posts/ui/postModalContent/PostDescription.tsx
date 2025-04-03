import { SmallAvatar } from '@/common/components/SmallAvatar/SmallAvatar'
import { Typography } from '@/common/components/Typography'

import styles from './PostModal.module.scss'
type Props = {
  description: string
  profileId: number
  userName: string
}
export const PostDescription = ({ description, profileId, userName }: Props) => {
  return (
    <div className={styles.comments}>
      <SmallAvatar profileId={profileId} />
      <Typography variant={'body1'}>{userName}</Typography>
      <Typography className={styles.text} variant={'body2'}>
        {description}
      </Typography>
    </div>
  )
}
export default PostDescription
