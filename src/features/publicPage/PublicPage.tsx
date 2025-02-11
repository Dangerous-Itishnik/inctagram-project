import { Posts } from '@/common/components/Posts/ui/Posts'
import { TotalUsers } from '@/common/components/TotalUsers/ui/TotalUsers'
import { usePostAllQuery } from '@/service/publicPosts/pablicPosts.service'

export const PublicPage = () => {
  const { data } = usePostAllQuery({ pageSize: 4 })

  return (
    <>
      <TotalUsers />
      <Posts posts={data && data.items} />
    </>
  )
}
