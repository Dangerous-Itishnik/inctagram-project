import { ImageCard } from '@/common/components/ImageCard/ImageCard'
import { Post } from '@/service/posts/post.type'

import styles from './ImageList.module.scss'

type Props = {
  openModal?: () => void
  posts: Post[]
}
export const ImageList = ({ posts }: Props) => {
  return (
    <div className={styles.list} key={'image'}>
      {posts?.map(post => (
        <ImageCard key={post.id} openModal={() => {}} post={post} postId={post.id} />
      ))}
    </div>
  )
}
