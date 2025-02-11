import React from 'react'

import styles from './Posts.module.scss'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { ru } from 'date-fns/locale/ru'

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
            console.log(post)
            return (
              <button type={'button'} className={styles.post} key={id}>
                <div className={styles.slider}>
                  <img
                    className={styles.image}
                    alt={''}
                    height={200}
                    src={images[0].url}
                    width={200}
                  />
                </div>
                <div className={styles.userProfile}>
                  <img alt={'Avatar'} className={styles.photoUser} src={avatarOwner} />
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

export type Image = {
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
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}
