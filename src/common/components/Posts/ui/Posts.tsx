import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { ru } from 'date-fns/locale/ru'
import Image from 'next/image'

import styles from './Posts.module.scss'

type PostsProps = {
  posts: Post[] | undefined
}

export const Posts = ({ posts }: PostsProps) => {
  const timeAgo = (date: string): string => {
    const parsedDate = new Date(date)

    return formatDistanceToNow(parsedDate, { addSuffix: true, locale: ru })
  }

  return (
    <div className={styles.posts}>
      {posts
        ? posts.map(post => {
            const { avatarOwner, description, id, images, userName } = post

            return (
              <button className={styles.post} key={id} type={'button'}>
                <div className={styles.slider}>
                  <Image alt={''} className={styles.image} fill src={images[0].url} />
                </div>
                <div className={styles.userProfile}>
                  <Image
                    alt={'Avatar'}
                    className={styles.photoUser}
                    height={36}
                    src={avatarOwner}
                    width={36}
                  />
                  <span className={styles.nameUser}>{userName}</span>
                </div>
                <div className={styles.ublicationDate}>{timeAgo(post.createdAt)}</div>
                <p className={styles.text}>
                  {description === ''
                    ? 'Нету описания. Поэтому стоит мое описанние, для того что бы проверить верстку'
                    : description}
                </p>
              </button>
            )
          })
        : 'Нет постов, что технически не возможно'}
    </div>
  )
}

export type ImagePostResponse = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type Owner = {
  firstName: string
  lastName: string
}

export type Post = {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: ImagePostResponse[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}
