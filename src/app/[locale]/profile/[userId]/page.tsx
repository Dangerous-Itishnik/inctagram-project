import { BASE_URL } from '@/common/api/common.api'
import { ImageList } from '@/common/components/Images/ImageList'
import ProfileHeader from '@/features/profilePage/ProfileHeader/ProfileHeader'
import { PostsResponse } from '@/service/posts/post.type'
import { Metadata } from 'next'

import styles from './page.module.scss'

type ProfileProps = {
  params: { postId: string; userId: string }
  searchParams: { postId?: string }
}

// Функция для получения данных пользователя
async function fetchProfileUser(profileId: number) {
  const response = await fetch(`${BASE_URL}/api/v1/public-user/profile/${profileId}`, {
    cache: 'no-store', // Отключаем кеширование, чтобы всегда получать актуальные данные
  })

  if (!response.ok) {
    throw new Error('Failed to fetch profile user data')
  }

  return response.json()
}

// Функция для получения данных постов
async function fetchPosts(profileId: number) {
  const response = await fetch(`${BASE_URL}/api/v1/public-posts/user/${profileId}`, {
    cache: 'no-store', // Отключаем кеширование, чтобы всегда получать актуальные данные
  })

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

export default async function Profile({ params }: ProfileProps) {
  const profileId = +params.userId
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
    </div>
  )
}
