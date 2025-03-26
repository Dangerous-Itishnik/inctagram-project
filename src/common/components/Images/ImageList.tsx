'use client'
import { ImageCard } from '@/common/components/ImageCard/ImageCard'
import { OpenPost } from '@/common/components/OpenPost/OpenPost'
import { Post } from '@/service/posts/post.type'

import styles from './ImageList.module.scss'

type Props = {
  posts: Post[]
}

export const ImageList = ({ posts }: Props) => {
  return (
    <div className={styles.list} key={'image'}>
      {posts?.map(post => (
        <OpenPost key={post.id} post={post}>
          <ImageCard post={post} />
        </OpenPost>
      ))}
    </div>
  )
}
