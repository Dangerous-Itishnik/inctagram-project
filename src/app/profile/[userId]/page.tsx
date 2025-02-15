'use client'

import ProfileHeader from '@/features/profilePage/ProfileHeadeer/ProfileHeader'
import { useProfileUserQuery } from '@/service/publicUsers/publicUsers.service'
import { Spinner } from '@radix-ui/themes'
import { useParams } from 'next/navigation'

export default function Profile() {
  const params = useParams()
  const profileId = +params.userId // id из URL
  const { data } = useProfileUserQuery({ profileId })

  if (!data) {
    return <Spinner />
  }

  return (
    <div>
      <ProfileHeader profileUser={data} />
    </div>
  )
}
