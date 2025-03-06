import { baseApi } from '@/service/baseApi'

export const myProfileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    userFollow: build.query<ApiResponse, string>({
      query: (userName: string) => ({
        method: 'GET',
        url: `/api/v1/users/${userName}/following`,
      }),
    }),
    userFollowers: build.query<ApiResponse, string>({
      query: (userName: string) => ({
        method: 'GET',
        url: `/api/v1/users/${userName}/followers`,
      }),
    }),
  }),
})

export const { useUserFollowQuery, useUserFollowersQuery } = myProfileApi

type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

type Item = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

type ApiResponse = {
  items: Item
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
