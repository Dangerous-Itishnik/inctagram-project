'use client'
import { ImageCard } from '@/common/components/ImageCard/ImageCard'
import { OpenPost } from '@/common/components/OpenPost/OpenPost'
import { PostContentQueryModal } from '@/features/posts/ui/postModalContent/PostContentQueryModal'
import { Post } from '@/service/posts/post.type'
import { useSearchParams } from 'next/navigation'

import styles from './ImageList.module.scss'

type Props = {
  posts: Post[]
}

export const ImageList = ({ posts }: Props) => {
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')

  return (
    <div className={styles.list} key={'image'}>
      {posts?.map(post => (
        <OpenPost key={post.id} post={post}>
          <ImageCard post={post} />
        </OpenPost>
      ))}
      {postId && <PostContentQueryModal postId={+postId} />}
    </div>
  )
}
