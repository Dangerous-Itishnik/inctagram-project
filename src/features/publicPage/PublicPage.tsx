import { Posts } from '@/common/components/Posts/ui/Posts'
import { TotalUsers } from '@/common/components/TotalUsers/ui/TotalUsers'
import { usePostAllQuery } from '@/service/publicPosts/pablicPosts.service'

import styles from './PublicPage.module.scss'
export const PublicPage = () => {
  const { data } = usePostAllQuery({ pageSize: 4 })

  return (
    <section className={styles.publicPage}>
      <TotalUsers />
      <Posts posts={data && data.items} />
    </section>
  )
}
