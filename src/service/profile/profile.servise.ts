import { baseApi } from '@/service/baseApi'
import { Profile } from '@/service/profile/profile'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<Profile, number>({
      query: () => ({
        method: 'GET',
        url: 'api/v1/users/profile',
      }),
    }),
    putProfile: build.mutation({
      query: body => ({
        body,
        method: 'PUT',
        url: `api/v1/users/profile`,
      }),
    }),
  }),
})

export const { useGetProfileQuery, usePutProfileMutation } = profileApi
