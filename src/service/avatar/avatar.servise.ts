import { baseApi } from '@/service/baseApi'

export const avatarApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      saveAvatar: build.mutation<AvatarResponse, { profilePhoto: File }>({
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
export const { useSaveAvatarMutation } = avatarApi
