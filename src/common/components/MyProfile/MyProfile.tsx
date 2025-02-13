import { useState } from 'react'

import { PostManagement } from '@/common/components/Modals/PostManagementModal/PostManagement'
import { ResponseUserPostData, useGetUserPostsQuery } from '@/service/posts/posts.service'

import styles from './myProfile.module.scss'

export const MyProfile = () => {
  const [selectedPost, setSelectedPost] = useState<ResponseUserPostData | null>(null)
  const [postManagement, setPostManagement] = useState(false)
  const userName = 'adsasdasd'
  const { data, refetch } = useGetUserPostsQuery(userName)

  const getUserPostHandler = (post: ResponseUserPostData) => {
    setSelectedPost(post)
    setPostManagement(true)
    console.log(post)
  }

  console.log(data)

  const closePostModalHandler = () => {
    setPostManagement(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <div className={styles.postItems}>
          {data?.items.map(post => (
            <div className={styles.postItem} key={post.id}>
              <img
                alt={post.title}
                onClick={() => getUserPostHandler(post)}
                src={post.images[0]?.url}
              />
            </div>
          ))}
        </div>
      </div>
      {postManagement && (
        <PostManagement
          closePostManagement={closePostModalHandler}
          onClose={closePostModalHandler}
          open
          post={selectedPost}
          refetchPosts={refetch}
        />
      )}
    </div>
  )
}
