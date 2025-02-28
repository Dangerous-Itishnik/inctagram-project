import { baseApi } from '@/service/baseApi'

export const myProfileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    userFollow: build.query<never, never>({
      query: userName => ({
        method: 'GET',
        url: `/api/v1/users/${userName}/following`,
      }),
    }),
  }),
})

export const { useUserFollowQuery } = myProfileApi
