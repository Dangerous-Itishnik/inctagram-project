// types/Post.ts
// pages/posts/[id].tsx

import { NextPage } from 'next'

export interface Image {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export interface Owner {
  firstName: string
  lastName: string
}

export interface Post {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

interface PostPageProps {
  post: Post
}

const PostPage: NextPage<PostPageProps> = () => {
  const data: Post = {
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
  }

  return (
    <div>
      <h1>{data.userName}</h1>
      <p>{data.description}</p>
      <p>Location: {data.location}</p>
      <p>Likes: {data.likesCount}</p>
      <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(data.updatedAt).toLocaleString()}</p>
      <img alt={data.userName} src={data.avatarOwner} />
      <div>
        <h3>Images:</h3>
        {data.images.map((image, index) => (
          <img alt={`Image ${index}`} key={index} src={image.url} />
        ))}
      </div>
      <div>
        <h3>Owner:</h3>
        <p>
          {data.owner.firstName} {data.owner.lastName}
        </p>
      </div>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps<PostPageProps> = async context => {
//   const { id } = context.params!
//
//   const res = await fetch(`https://inctagram.work/api/v1/1/posts/2`)
//
//   if (res.status === 404) {
//     return {
//       notFound: true,
//     }
//   }
//
//   if (res.status === 401) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }
//
//   const post: Post = await res.json()
//
//   return {
//     props: {
//       post,
//     },
//   }
// }

export default PostPage
