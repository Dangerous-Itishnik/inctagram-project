import { baseApi } from '@/service/baseApi'

export const notificationApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getNotifications: build.query<NotificationsItems, void>({
        providesTags: ['Notification'],
        query: () => ({
          method: 'GET',
          url: 'api/v1/notifications',
        }),
      }),
      markAsRead: build.mutation<void, { ids: number[] }>({
        invalidatesTags: ['Notification'],
        query: body => ({
          body,
          method: 'PUT',
          url: '/api/v1/notifications/mark-as-read',
        }),
      }),
    }
  },
})

export const { useGetNotificationsQuery, useMarkAsReadMutation } = notificationApi

export type NotificationItem = {
  createdAt: Date | string
  id: number
  isRead: boolean
  message: string
  notifyAt: Date | string
}

export type NotificationsItems = {
  items: NotificationItem[]
}
export type MessagesStatus = 'READ' | 'RECEIVED' | 'SENT'

export type Message = {
  createdAt: Date
  id: number
  messageText: string
  messageType: string
  ownerId: number
  receiverId: number
  status: MessagesStatus
  updatedAt: Date | string
}
