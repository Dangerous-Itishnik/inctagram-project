import { BASE_URL } from '@/common/api/common.api'
import { ImageList } from '@/common/components/Images/ImageList'
import { OpenPostModal } from '@/common/components/Modals/OpenPostModal/OpenPostModal'
import { RadixModal } from '@/common/components/Modals/RadixModal/RadixModal'
import ProfileHeader from '@/features/profilePage/ProfileHeadeer/ProfileHeader'
import { PostsResponse } from '@/service/posts/post.type'
import { Metadata } from 'next'

import styles from './page.module.scss'

type ProfileProps = {
  params: { postId: string; userId: string }
  searchParams: { postId?: string }
}

// Функция для получения данных пользователя
async function fetchProfileUser(profileId: number) {
  const response = await fetch(`${BASE_URL}/api/v1/public-user/profile/${profileId}`)

  if (!response.ok) {
    throw new Error('Failed to fetch profile user data')
  }

  return response.json()
}
// Функция для получения данных постов
async function fetchPosts(profileId: number) {
  const response = await fetch(`${BASE_URL}/api/v1/public-posts/user/${profileId}`)

  if (!response.ok) {
    throw new Error('Failed to fetch posts data')
  }

  return response.json() as Promise<PostsResponse>
}

export async function generateMetadata(): Promise<Metadata> {
  // Здесь можно задать метаданные на основе параметров
  return {
    title: `Profile`,
  }
}

export default async function Profile({ params, searchParams }: ProfileProps) {
  const profileId = +params.userId // id из URL
  const postIdParams = searchParams.postId ? +searchParams.postId : null

  let profileUserData = null
  let postsData = null

  try {
    // Получение данных пользователя
    profileUserData = await fetchProfileUser(profileId)

    // Получение данных постов
    postsData = await fetchPosts(profileId)
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
  }

  if (!profileUserData || !postsData) {
    return <div>Данные не подгрузились</div>
  }

  return (
    <div className={styles.profilePage}>
      <ProfileHeader profileUser={profileUserData} />
      <ImageList posts={postsData.items} />
      {postIdParams && <div>Открытие модалки с постом id:{postIdParams}</div>}
      {postIdParams && <OpenPostModal postId={postIdParams} />}
    </div>
  )
}
