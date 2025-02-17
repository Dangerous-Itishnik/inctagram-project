import { baseApi } from '@/service/baseApi'

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    deleteUserPost: build.mutation<never, number>({
      query: postId => ({
        method: 'DELETE',
        url: `/api/v1/posts/${postId}`,
      }),
    }),
    getUserPosts: build.query<ResponseUserPostData, string>({
      query: userName => ({
        url: `/api/v1/posts/${userName}`,
      }),
    }),
    postImage: build.mutation<Response, FormData>({
      query: images => ({
        body: images,
        method: 'POST',
        url: '/api/v1/posts/image',
      }),
    }),
    postPost: build.mutation({
      query: data => ({
        body: data,
        method: 'POST',
        url: '/api/v1/posts',
      }),
    }),
    updateUserPost: build.mutation<never, string>({
      query: post => ({
        body: { description: post.description },
        method: 'PUT',
        url: `/api/v1/posts/${post.id}`,
      }),
    }),
  }),
})

export const {
  useDeleteUserPostMutation,
  useGetUserPostsQuery,
  usePostImageMutation,
  usePostPostMutation,
  useUpdateUserPostMutation,
} = postsApi

type Image = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

type Owner = {
  firstName: string
  lastName: string
}

type Item = {
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

export type ResponseUserPostData = {
  items: Item[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type Response = {
  images: ResponseImages[]
}
export type ResponseImages = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
