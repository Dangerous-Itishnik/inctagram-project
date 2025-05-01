import { baseApi } from '@/service/baseApi'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getNotifications: build.query<NotificationResponse, unknown>({
      query: () => ({
        method: 'GET',
        url: '/api/v1/notifications',
      }),
    }),
  }),
})

export const { useGetNotificationsQuery } = notificationsApi

export type NotificationResponse = {
  items: NotificationItemType[]
  notReadCount: number
  pageSize: number
  totalCount: number
}
export type NotificationItemType = {
  createdAt: string
  id: number
  isRead: boolean
  message: string
}
