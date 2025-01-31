import { useGetUserPostsQuery } from '@/service/posts/posts.service'

import styles from './myProfile.module.scss'

export const MyProfile = () => {
  const userName = 'adsasdasd'
  const { data } = useGetUserPostsQuery(userName)

  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <div className={styles.postItems}>
          {data?.items.map(post => (
            <div className={styles.postItem} key={post.id}>
              <img src={post.images[0]?.url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
