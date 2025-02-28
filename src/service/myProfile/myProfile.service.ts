import { baseApi } from '@/service/baseApi'

export const myProfileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    postAll: build.query<never, never>({
      query: data => ({
        method: 'GET',
        params: data,
        url: `/api/v1/public-posts/all/`,
      }),
    }),
  }),
})

export const {} = myProfileApi
