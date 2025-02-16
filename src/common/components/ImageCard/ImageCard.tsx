import { Post } from '@/service/posts/post.type'
import Image from 'next/image'

import styles from './ImageCard.module.scss'

type Props = {
  post: Post
  postId: number
}
export const ImageCard = ({ post, postId }: Props) => {
  return (
    <>
      <div className={styles.imageBox}>
        <Image
          alt={`Image`}
          className={styles.image}
          height={post.images[0].height}
          key={postId}
          priority
          src={post.images[0].url}
          width={post.images[0].width}
        />
      </div>
    </>
  )
}
