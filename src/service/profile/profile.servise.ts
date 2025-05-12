import { baseApi } from '@/service/baseApi'
import { Profile } from '@/service/profile/profile'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<Profile, number>({
      providesTags: ['Profile'],
      query: () => ({
        method: 'GET',
        url: 'api/v1/users/profile',
      }),
    }),
    putProfile: build.mutation({
      invalidatesTags: ['Profile'],
      query: body => ({
        body,
        method: 'PUT',
        url: `api/v1/users/profile`,
      }),
    }),
  }),
})

export const { useGetProfileQuery, usePutProfileMutation } = profileApi
