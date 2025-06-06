import { Post } from '@/service/posts/post.type'
import { formatDistanceToNow } from 'date-fns'
import ru from 'date-fns/locale/ru'
import Image from 'next/image'

import styles from '@/common/components/Posts/ui/PostCard/PostCard.module.scss'

type Props = {
  post: Post
}

export const PostCard = ({ post }: Props) => {
  const { avatarOwner, description, images, userName } = post

  const timeAgo = (date: string): string => {
    const parsedDate = new Date(date)

    return formatDistanceToNow(parsedDate, { addSuffix: true, locale: ru })
  }

  return (
    <button className={styles.post} type={'button'}>
      <div className={styles.slider}>
        {images.length ? (
          <Image
            alt={''}
            className={styles.image}
            fill
            loading={'lazy'}
            sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            src={images[0].url}
          />
        ) : (
          <div className={styles.image}>нету фото</div>
        )}
      </div>
      <div className={styles.userProfile}>
        {avatarOwner ? (
          <Image
            alt={'Avatar'}
            className={styles.photoUser}
            height={36}
            src={avatarOwner}
            width={36}
          />
        ) : (
          <div className={styles.photoUser}>нету </div>
        )}
        <span className={styles.nameUser}>{userName}</span>
      </div>
      <div className={styles.ublicationDate}>{timeAgo(post.createdAt)}</div>
      <p className={styles.text}>{description === '' ? 'Описания нету' : description}</p>
    </button>
  )
}
