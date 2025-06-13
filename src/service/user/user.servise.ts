import { baseApi } from '@/service/baseApi'

export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    deleteFollow: build.mutation<void, number>({
      query: userId => ({
        method: 'DELETE',
        url: `api/v1/users/follower/${userId}`,
      }),
    }),
    getFollowing: build.query<Follow, string>({
      query: userName => ({
        method: 'GET',
        url: `api/v1/users/${userName}/following`,
      }),
    }),
    getUserProfile: build.query<UserProfile, string>({
      query: userName => `/api/v1/users/${userName}`,
    }),
    getUsers: build.query<
      UsersResponse,
      {
        cursor?: number
        pageNumber?: number
        pageSize?: number
        search?: string
      }
    >({
      query: ({ cursor, pageNumber = 1, pageSize = 12, search = '' }) => {
        const params = new URLSearchParams()

        if (cursor !== undefined) {
          params.append('cursor', cursor.toString())
        }
        if (pageNumber !== undefined) {
          params.append('pageNumber', pageNumber.toString())
        }
        if (pageSize !== undefined) {
          params.append('pageSize', pageSize.toString())
        }
        if (search) {
          params.append('search', search)
        }

        return {
          method: 'GET',
          params,
          url: `/api/v1/users`,
        }
      },
    }),
    homePage: build.query<ApiResponse, GetFollowerPublicationsParams>({
      query: ({ endCursorPostId = 0, pageNumber = 1, pageSize = 12 }) => {
        const params = new URLSearchParams()

        if (endCursorPostId !== undefined) {
          params.append('cursor', endCursorPostId.toString())
        }
        if (pageNumber !== undefined) {
          params.append('pageNumber', pageNumber.toString())
        }
        if (pageSize !== undefined) {
          params.append('pageSize', pageSize.toString())
        }

        return {
          method: 'GET',
          params,
          url: `/api/v1/home/publications-followers`,
        }
      },
    }),
    userFollow: build.mutation<void, { selectedUserId: number }>({
      query: body => ({
        body,
        method: 'POST',
        url: '/api/v1/users/following',
      }),
    }),
  }),
})

export const {
  useDeleteFollowMutation,
  useGetFollowingQuery,
  useGetUserProfileQuery,
  useGetUsersQuery,
  useHomePageQuery,
  useUserFollowMutation,
} = userApi

type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

type User = {
  avatars: Avatar[]
  createdAt: string
  firstName: string
  id: number
  lastName: string
  userName: string
}

type UsersResponse = {
  items: User[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type UserProfile = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  followersCount: number
  followingCount: number
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  lastName: string
  publicationsCount: number
  region: string
  userName: string
}

type Follow = {
  items: Item[]
  nextCursor: number
  nullable: true
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
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

export type ItemHome = {
  avatarOwner: string
  avatarWhoLikes: []
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

interface ApiResponse {
  items: ItemHome[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
export type GetFollowerPublicationsParams = {
  endCursorPostId?: number
  pageNumber?: number
  pageSize?: number
}
