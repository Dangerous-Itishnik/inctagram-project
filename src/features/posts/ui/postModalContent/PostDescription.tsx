import { Typography } from '@/common/components/Typography'

import styles from './PostModal.module.scss'
type PostCommentsProps = {
  description: string
  userName: string
}
export const PostDescription = ({ description, userName }: PostCommentsProps) => {
  return (
    <div className={styles.comments}>
      <Typography variant={'body1'}>{userName}</Typography>
      <Typography className={styles.text} variant={'body2'}>
        {description}
      </Typography>
    </div>
  )
}
export default PostDescription
