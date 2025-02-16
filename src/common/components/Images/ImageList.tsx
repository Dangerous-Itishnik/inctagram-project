'use client'
import { ImageCard } from '@/common/components/ImageCard/ImageCard'
import { Post } from '@/service/posts/post.type'
import { useRouter, useSearchParams } from 'next/navigation'

import styles from './ImageList.module.scss'

type Props = {
  posts: Post[]
}

export const ImageList = ({ posts }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const openPost = (postId: number) => {
    const newParams = new URLSearchParams(searchParams.toString()) // Клонируем текущие параметры

    newParams.set('postId', `${postId}`) // Добавляем новый параметр
    router.push(`?${newParams.toString()}`, { scroll: false }) // Обновляем URL с новыми параметрами
  }

  return (
    <div className={styles.list} key={'image'}>
      {posts?.map(post => (
        <div key={post.id} onClick={() => openPost(post.id)}>
          <ImageCard key={post.id} post={post} postId={post.id} />
        </div>
      ))}
    </div>
  )
}
