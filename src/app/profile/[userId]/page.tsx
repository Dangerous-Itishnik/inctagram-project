'use client'

import ProfileHeader from '@/features/profilePage/ProfileHeadeer/ProfileHeader'
import { useGetPostQuery } from '@/service/posts/posts.service'
import { useProfileUserQuery } from '@/service/publicUsers/publicUsers.service'
import { Spinner } from '@radix-ui/themes'
import { useParams } from 'next/navigation'

export default function Profile() {
  const params = useParams()
  const profileId = +params.userId // id из URL
  const { data: profileUserData, isLoading: isLoadingProfile } = useProfileUserQuery({ profileId })
  const { data: postsData, isLoading: isLoadingPost } = useGetPostQuery({ userName: 'adsasdasd' })

  if (isLoadingProfile || isLoadingPost) {
    return <Spinner />
  }
  if (!profileUserData || !postsData) {
    return <div>Данные не подгрузились</div>
  }

  return (
    <div>
      <ProfileHeader profileUser={profileUserData} />
    </div>
  )
}
