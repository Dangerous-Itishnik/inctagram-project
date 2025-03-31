import { OpenPost } from '@/common/components/OpenPost/OpenPost'
import { PostCard } from '@/common/components/Posts/ui/PostCard/PostCard'
import { Post } from '@/service/posts/post.type'

import styles from './Posts.module.scss'

type Props = {
  posts: Post[]
}

export const Posts = ({ posts }: Props) => {
  return (
    <div className={styles.posts}>
      {posts.map(post => (
        <OpenPost key={post.id} post={post}>
          <PostCard post={post} />
        </OpenPost>
      ))}
    </div>
  )
}
