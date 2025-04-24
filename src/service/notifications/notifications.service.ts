import { baseApi } from '@/service/baseApi'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getNotifications: build.query<unknown, unknown>({
      query: () => ({
        method: 'GET',
        url: '',
      }),
    }),
  }),
})
