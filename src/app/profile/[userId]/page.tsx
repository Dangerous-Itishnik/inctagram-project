'use client'

import { Post } from '@/app/posts/[id]/page'
import Link from 'next/link'
import { Posts } from '@/common/components/Posts/ui/Posts'

export default function Profile() {
  const data: Post[] = [
    {
      avatarOwner:
        'https://storage.yandexcloud.net/users-inctagram/users/41/avatar/3359612b-cff9-4b6b-8897-fbbd09153d51-images-45x45',
      avatarWhoLikes: false,
      createdAt: '2025-02-10T17:55:39.162Z',
      description: 'description',
      id: 1,
      images: [
        {
          createdAt: '2025-02-10T17:55:38.854Z',
          fileSize: 300,
          height: 300,
          uploadId: 'string',
          url: 'https://example.com/image.jpg',
          width: 300,
        },
      ],
      isLiked: true,
      likesCount: 1,
      location: 'location',
      owner: {
        firstName: 'firstName',
        lastName: 'lastName',
      },
      ownerId: 1,
      updatedAt: '2025-02-10T17:55:39.162Z',
      userName: 'Alex',
    },
  ]

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  )
}

interface PostListProps {
  posts: Post[]
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <span>{post.userName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
