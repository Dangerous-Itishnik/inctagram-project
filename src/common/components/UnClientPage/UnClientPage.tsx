import { BASE_URL } from '@/common/api/common.api'
import { Posts } from '@/common/components/Posts/ui/Posts'
import { TotalUsers } from '@/common/components/TotalUsers/ui/TotalUsers'
import { PostsAll } from '@/service/publicPosts/publicPosts.service'

import '@/styles/index.scss'

import styles from './page.module.scss'
//export const dynamic = 'force-static'

const fetchData = {
  posts: async (params: PostsAll) => {
    const query = new URLSearchParams(params as Record<string, string>)
    const res = await fetch(`${BASE_URL}/api/v1/public-posts/all?${query}`, {
      method: 'GET',
      next: { revalidate: 60, tags: ['posts'] },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch posts')
    }

    return res.json()
  },
  totalUsers: async () => {
    const res = await fetch(`${BASE_URL}/api/v1/public-user`, {
      method: 'GET',
      next: { revalidate: 60, tags: ['total-users'] },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch total users')
    }

    return res.json()
  },
}

const UnClientPage = async () => {
  try {
    const [users, posts] = await Promise.all([
      fetchData.totalUsers(),
      fetchData.posts({ pageSize: 4 }),
    ])

    return (
      <section className={styles.publicPage}>
        <TotalUsers totalCount={users.totalCount} />
        <Posts posts={posts.items} />
      </section>
    )
  } catch {
    return (
      <section className={styles.publicPage}>
        <TotalUsers totalCount={0} />
        <div>Данные не загрузились</div>
      </section>
    )
  }
}

export default UnClientPage
