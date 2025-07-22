import { baseApi } from '@/service/baseApi'
import { SocketApi } from '@/socket/useSocket'

export const messengerApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getAllMessages: build.query<MessageResponse, QueryArgsAll>({
        providesTags: ['MESSAGES'],
        query: () => ({
          method: 'GET',
          url: 'api/v1/messenger',
        }),
        async onCacheEntryAdded(
          { ...args },
          { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
        ) {
          try {
            await cacheDataLoaded

            const handleMessage = (msg: Message) => {
              updateCachedData(draft => {
                const index = draft.items.findIndex(
                  dialog =>
                    (msg.ownerId === dialog.receiverId && msg.receiverId === dialog.ownerId) ||
                    (msg.receiverId === dialog.receiverId && msg.ownerId === dialog.ownerId)
                )

                if (index !== -1) {
                  draft.items[index] = { ...draft.items[index], ...msg }
                } else {
                  dispatch(
                    messengerApi.endpoints.getAllMessages.initiate(args, { forceRefetch: true })
                  )
                }
              })
            }

            const unsubscribe = SocketApi.onMessageSent(handleMessage)

            await cacheEntryRemoved
            unsubscribe()
          } catch (error) {
            console.error('WebSocket error in getAllDialogs:', error)
          }
        },
      }),
      getMessageById: build.query<MessageResponse, QueryArgs>({
        query: ({ dialoguePartnerId, ...params }) => ({
          url: `/api/v1/messenger/${dialoguePartnerId}`,
          method: 'GET',
          params,
        }),
        transformResponse: (response: MessageResponse) => ({
          ...response,
          items: response.items.sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          ),
        }),
        async onCacheEntryAdded(
          { dialoguePartnerId },
          { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
        ) {
          try {
            await cacheDataLoaded

            const handleReceive = (data: Message | Message[]) => {
              const messages = Array.isArray(data) ? data : [data]

              updateCachedData(draft => {
                for (const message of messages) {
                  const index = draft.items.findIndex(m => m.id === message.id)

                  if (index !== -1) {
                    draft.items[index] = message
                  } else if (
                    message.ownerId === dialoguePartnerId ||
                    message.receiverId === dialoguePartnerId
                  ) {
                    draft.items.push(message)
                    draft.totalCount += 1
                  }
                }
              })
            }

            const unsubscribe = SocketApi.onMessageReceived(handleReceive)

            await cacheEntryRemoved
            unsubscribe()
          } catch (error) {
            console.error('Error in message subscription:', error)
          }
        },
      }),
      sendMessage: build.mutation<null, { message: string; receiverId: number }>({
        invalidatesTags: ['MESSAGE'],
        queryFn: ({ message, receiverId }) => {
          try {
            SocketApi.sendMessage({ message, receiverId })

            return { data: null }
          } catch (error) {
            console.error('Send message error:', error)

            return {
              error: {
                error: `Failed to send message. ${error}`,
                status: 'CUSTOM_ERROR',
              },
            }
          }
        },
      }),

      updateMessageStatus: build.mutation<void, UpdateMessageStatusArgsType>({
        invalidatesTags: ['MESSAGE'],
        onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled
            dispatch(
              messengerApi.util.updateQueryData('getAllMessages', {}, draft => {
                arg.ids.forEach(id => {
                  const index = draft.items.findIndex(dialog => dialog.id === id)

                  if (index !== -1) {
                    draft.items[index].status = MessageStatus.READ
                  }
                })
              })
            )
          } catch (error) {
            console.log(error)
          }
        },
        query: body => ({
          body,
          method: 'PUT',
          url: `/messenger`,
        }),
      }),
      getProfileById: build.query<UserProfile, number>({
        query: profileId => `/api/v1/public-user/profile/${profileId}`,
      }),
    }
  },
})

export const {
  useGetAllMessagesQuery,
  useGetMessageByIdQuery,
  useGetProfileByIdQuery,
  useSendMessageMutation,
  useUpdateMessageStatusMutation,
} = messengerApi
export type StatusType = 'SENT' | 'RECEIVED' | 'READ'
export type MessageType = 'TEXT' | 'IMAGE' | 'VOICE'

export enum MessageStatus {
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  READ = 'READ',
}

export type Message = {
  id: number
  ownerId: number
  receiverId: number
  messageText: string
  status: StatusType
  messageType: MessageType
  createdAt: string
  updatedAt: string
  userName?: string
  avatars: Avatar[]
}

export type MessageResponse = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: Message[]
}
export type ByUser = {
  id: number
  ownerId: number
  receiverId: number
  messageText: string
  createdAt: string
  updatedAt: string
  messageType: MessageType
  status: StatusType
}

type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

type UserMetadata = {
  following: number
  followers: number
  publications: number
}

export type UserProfile = {
  id: number
  userName: string
  aboutMe: string
  avatars: Avatar[]
  userMetadata: UserMetadata
  hasPaymentSubscription: boolean
}

type QueryArgs = {
  dialoguePartnerId: number
  cursor?: number
  pageSize?: number
  totalCount?: number
  searchName?: string
}

type QueryArgsAll = {
  cursor?: number
  pageSize?: number
  totalCount?: number
  searchName?: string
}

export type UpdateMessageStatusArgsType = {
  ids: number[]
}
