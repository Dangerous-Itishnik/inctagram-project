import { Post } from '@/service/posts/post.type'
import Image from 'next/image'

import styles from './ImageCard.module.scss'

type Props = {
  post: Post
}
export const ImageCard = ({ post }: Props) => {
  return (
    <>
      <div className={styles.imageBox}>
        {post.images?.[0] && (
          <Image
            alt={`Image`}
            className={styles.image}
            height={post.images[0].height}
            key={post.id}
            priority
            src={post.images[0].url}
            width={post.images[0].width}
          />
        )}
      </div>
    </>
  )
}
