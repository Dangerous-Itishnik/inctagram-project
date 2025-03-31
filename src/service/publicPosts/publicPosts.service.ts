import { baseApi } from '@/service/baseApi'

export const publicPostsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    postAll: build.query<Response, PostsAll>({
      query: data => ({
        method: 'GET',
        params: data,
        url: `/api/v1/public-posts/all/`,
      }),
    }),
  }),
})

export const { usePostAllQuery } = publicPostsApi

export type PostsAll = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: 'asc' | 'desc'
  sortDirection?: string
}

export interface Response {
  items: ResponseItems[]
  pageSize: number
  totalCount: number
  totalUsers: number
}
export interface ResponseItemsImages {
  createdAt: string
  fileSize: number
  height: number
  id: number
  uploadId: string
  url: string
  width: number
}
export interface ResponseItemsOwner {
  firstName: string
  lastName: string
}
export interface ResponseItems {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: ResponseItemsImages[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: ResponseItemsOwner
  ownerId: number
  updatedAt: string
  userName: string
}
