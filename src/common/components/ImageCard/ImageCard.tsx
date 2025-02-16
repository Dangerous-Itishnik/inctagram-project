import { Post } from '@/service/posts/post.type'
import Image from 'next/image'

import styles from './ImageCard.module.scss'

type Props = {
  openModal: () => void
  post: Post
  postId: number
}
export const ImageCard = ({ openModal, post, postId }: Props) => {
  return (
    <>
      <div onClick={openModal}>
        <Image
          alt={`Image`}
          className={styles.image}
          height={post.images[0].height}
          key={postId}
          onLoad={() => true} // useLoader?
          priority
          src={post.images[0].url}
          width={post.images[0].width}
        />
      </div>
    </>
  )
}
