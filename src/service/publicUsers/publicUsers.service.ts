import { baseApi } from '@/service/baseApi'

export const publicUsersApi = baseApi.injectEndpoints({
  endpoints: build => ({
    profileUser: build.query<ProfileUserResponse, { profileId: number }>({
      query: body => ({
        method: 'GET',
        url: `/api/v1/public-user/profile/${body.profileId}`,
      }),
    }),
    totalUsers: build.query<{ totalCount: number }, void>({
      query: () => ({
        method: 'GET',
        url: '/api/v1/public-user',
      }),
    }),
  }),
})

export const { useProfileUserQuery, useTotalUsersQuery } = publicUsersApi

export type ProfileUserResponse = {
  aboutMe: string
  avatars: ProfileUserResponseAvatars[]
  id: number
  userMetadata: ProfileUserResponseUserMetadata
  userName: string
}
export type ProfileUserResponseAvatars = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
export type ProfileUserResponseUserMetadata = {
  followers: number
  following: number
  publications: number
}
