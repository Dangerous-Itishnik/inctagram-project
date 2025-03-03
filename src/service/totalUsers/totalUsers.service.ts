import { baseApi } from '@/service/baseApi'

export const totalUsersApi = baseApi.injectEndpoints({
  endpoints: build => ({
    totalUsers: build.query<{ totalCount: number }, void>({
      query: () => ({
        method: 'GET',
        url: '/api/v1/public-user',
      }),
    }),
  }),
})

export const { useTotalUsersQuery } = totalUsersApi
