import React from 'react'

import { usePostAllQuery } from '@/service/publicPosts/pablicPosts.service'

import styles from './PublicPage.module.scss'
export const PublicPage = () => {
  const { data, refetch } = usePostAllQuery({ pageSize: 4 })

  console.log(data)
  const handleClick = () => {
    refetch()
  }

  return (
    <div className={styles.posts}>
      {data
        ? data.items.map(post => {
            return (
              <div key={post.id}>
                <img alt={''} height={200} src={post.images[0].url} width={200} />
                <img alt={''} height={45} src={post.avatarOwner} width={45} />
              </div>
            )
          })
        : 'Нет постов, что технически не возможно'}
    </div>
  )
}
