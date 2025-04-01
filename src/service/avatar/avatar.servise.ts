import { baseApi } from '@/service/baseApi'

export const avatarApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      deleteAvatar: build.mutation<void, void>({
        invalidatesTags: ['Avatar', 'Profile'],
        query: () => ({
          method: 'DELETE',
          url: 'api/v1/users/profile/avatar',
        }),
      }),
      saveAvatar: build.mutation<AvatarResponse, { profilePhoto: File }>({
        invalidatesTags: ['Avatar', 'Profile'],
        query: ({ profilePhoto }) => {
          const formData = new FormData()

          formData.append('file', profilePhoto)

          return {
            body: formData,
            method: 'POST',
            url: '/api/v1/users/profile/avatar',
          }
        },
      }),
    }
  },
})

type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

type AvatarResponse = {
  avatars: Avatar[]
}
export const { useDeleteAvatarMutation, useSaveAvatarMutation } = avatarApi
