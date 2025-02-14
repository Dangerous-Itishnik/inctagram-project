import { Posts } from '@/common/components/Posts/ui/Posts'
import { TotalUsers } from '@/common/components/TotalUsers/ui/TotalUsers'
import { usePostAllQuery } from '@/service/publicPosts/publicPosts.service'
import { Spinner } from '@radix-ui/themes'

import styles from './PublicPage.module.scss'

export const PublicPage = () => {
  const { data, isLoading } = usePostAllQuery({ pageSize: 4 })

  if (isLoading || !data) {
    return <Spinner />
  }

  return (
    <section className={styles.publicPage}>
      <TotalUsers />
      {data?.items ? <Posts posts={data && data.items} /> : 'Посты не подгрузились'}
    </section>
  )
}
