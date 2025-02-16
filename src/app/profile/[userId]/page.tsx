'use client'

import { useEffect, useState } from 'react'

import { ImageList } from '@/common/components/Images/ImageList'
import { ImagePostResponse } from '@/common/components/Posts/model/postsType'
import ProfileHeader from '@/features/profilePage/ProfileHeadeer/ProfileHeader'
import { ResponseImages } from '@/service/posts/post.type'
import { useGetPostQuery } from '@/service/posts/posts.service'
import { useProfileUserQuery } from '@/service/publicUsers/publicUsers.service'
import { Spinner } from '@radix-ui/themes'
import { useParams } from 'next/navigation'

export default function Profile() {
  const params = useParams()
  const profileId = +params.userId // id из URL
  const { data: profileUserData, isLoading: isLoadingProfile } = useProfileUserQuery({ profileId })
  const { data: postsData, isLoading: isLoadingPost } = useGetPostQuery({ userName: 'adsasdasd' })
  const [images, setImages] = useState<ImagePostResponse[]>([])

  useEffect(() => {
    const imagesData: ResponseImages[] = postsData?.items
      ? postsData.items.flatMap(item =>
          item.images.filter(image => image.url && typeof image.url === 'string').slice(0, 1)
        )
      : []
    const index = images.findIndex(image => image.id === imagesData[0]?.id)

    if (!postsData) {
      setImages([])
    } else if (images.length && images[0]?.id < imagesData[0]?.id) {
      setImages(imagesData)
    } else {
      setImages(prev => {
        return index === -1 ? [...prev, ...imagesData] : prev
      })
    }
  }, [postsData, images])
  if (isLoadingProfile || isLoadingPost) {
    return <Spinner />
  }
  if (!profileUserData || !postsData) {
    return <div>Данные не подгрузились</div>
  }

  return (
    <div>
      <ProfileHeader profileUser={profileUserData} />
      <ImageList data={postsData} posts={images} />
    </div>
  )
}
