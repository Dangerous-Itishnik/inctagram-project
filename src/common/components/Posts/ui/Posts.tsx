import { Post } from '@/common/components/Posts/model/postsType'
import { PostCard } from '@/common/components/Posts/ui/PostCard/PostCard'
import { Spinner } from '@radix-ui/themes'

import styles from './Posts.module.scss'

type PostsProps = {
  posts: Post[] | undefined
}

export const Posts = ({ posts }: PostsProps) => {
  return (
    <div className={styles.posts}>
      {posts ? posts.map(post => <PostCard key={post.id} post={post} />) : <Spinner />}
    </div>
  )
}
