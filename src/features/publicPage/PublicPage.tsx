import React from 'react'
import { TotalUsers } from '@/common/components/TotalUsers/ui/TotalUsers'
import { Posts } from '@/common/components/Posts/ui/Posts'
import { usePostAllQuery } from '@/service/publicPosts/pablicPosts.service'

export const PublicPage = () => {
  const { data } = usePostAllQuery({ pageSize: 4 })
  console.log('render')
  return (
    <>
      <TotalUsers />
      <Posts posts={data && data.items} />
    </>
  )
}
