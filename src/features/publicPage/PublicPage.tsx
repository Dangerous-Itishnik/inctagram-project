import { BASE_URL } from '@/common/api/common.api'
import { Posts } from '@/common/components/Posts/ui/Posts'
import { TotalUsers } from '@/common/components/TotalUsers/ui/TotalUsers'
import { PostsAll, Response } from '@/service/publicPosts/publicPosts.service'

import styles from './PublicPage.module.scss'

export const dynamic = 'force-static'

async function fetchTotalUsers() {
  const response = await fetch(`${BASE_URL}/api/v1/public-user`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch profile user data')
  }

  return response.json() as Promise<{ totalCount: number }>
}

async function fetchPosts(params: PostsAll) {
  const queryString = new URLSearchParams(params as Record<string, string>).toString()

  const response = await fetch(`${BASE_URL}/api/v1/public-posts/all?${queryString}`, {
    method: 'GET', // Явно указываем GET
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch public posts')
  }

  return response.json() as Promise<Response>
}

export const PublicPage = async () => {
  try {
    const dataTotalUser = await fetchTotalUsers()
    const dataPosts = await fetchPosts({ pageSize: 4 })

    return (
      <section className={styles.publicPage}>
        <TotalUsers totalCount={dataTotalUser.totalCount} />
        <Posts posts={dataPosts.items} />
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
