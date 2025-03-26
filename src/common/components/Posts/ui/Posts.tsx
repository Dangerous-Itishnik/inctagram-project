import { PostCard } from '@/common/components/Posts/ui/PostCard/PostCard'
import { Post } from '@/service/posts/post.type'

import styles from './Posts.module.scss'

type PostsProps = {
  posts: Post[]
}

export const Posts = ({ posts }: PostsProps) => {
  return (
    <div className={styles.posts}>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
