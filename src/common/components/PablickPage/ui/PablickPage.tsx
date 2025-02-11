import React, { useState } from 'react'

import { usePostAllQuery } from '@/service/publicPosts/pablicPosts.service'

import styles from './PublicPage.module.scss'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { ru } from 'date-fns/locale/ru'

export const PublicPage = () => {
  //TODO вечные запросы
  const { data } = usePostAllQuery({ pageSize: 4 })

  const timeAgo = (date: string): string => {
    const parsedDate = new Date(date)

    return formatDistanceToNow(parsedDate, { addSuffix: true, locale: ru })
  }

  return (
    <div className={styles.posts}>
      {data
        ? data.items.map(post => {
            const { avatarOwner, description, id, images, userName } = post
            console.log(post)
            return (
              <div className={styles.post} key={id}>
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
              </div>
            )
          })
        : 'Нет постов, что технически не возможно'}
    </div>
  )
}
