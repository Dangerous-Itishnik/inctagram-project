import { Message } from '@/service/messenger/messenger.service'
import { Socket, io } from 'socket.io-client'

const WS_EVENT_PATH = {
  RECEIVE_MESSAGE: 'receive-message',
  MESSAGE_SEND: 'message-send',
  UPDATE_MESSAGE: 'update-message',
  MESSAGE_DELETED: 'message-deleted',
  NOTIFICATIONS: 'notifications',
  ERROR: 'error',
}

export const SocketApi = {
  socket: null as Socket | null,

  createConnection(token: string): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }

    this.socket = io('https://inctagram.work', {
      autoConnect: true,
      query: {
        accessToken: token,
      },
      transports: ['websocket'],
    })

    this.socket.on('connect', () => {
      console.log('Socket connected')
    })

    this.socket.on('disconnect', reason => {
      console.log('Socket disconnected:', reason)
    })

    this.socket.on('connect_error', error => {
      console.error('Socket connection error:', error.message)
    })
  },

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  },

  sendMessage(payload: { message: string; receiverId: number }) {
    this.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, payload)
  },

  onMessageReceived(callback: (data: Message | Message[]) => void): () => void {
    if (!this.socket || !this.socket.connected) {
      console.error('Socket not initialized or disconnected')

      return () => {}
    }

    const messageHandler = (data: Message) => {
      try {
        const normalizeMessage = (msg: Message): Message =>
          <Message>{
            id: msg.id,
            messageText: String(msg.messageText),
            ownerId: msg.ownerId,
            receiverId: msg.receiverId,
            createdAt: msg.createdAt,
            status: msg.status,
          }

        const processedData = Array.isArray(data)
          ? data.map(normalizeMessage).reverse()
          : [normalizeMessage(data)]

        callback(processedData)
      } catch (error) {
        console.error('Message processing failed:', error)
      }
    }

    this.socket.on(WS_EVENT_PATH.RECEIVE_MESSAGE, messageHandler)

    return () => {
      this.socket?.off(WS_EVENT_PATH.RECEIVE_MESSAGE, messageHandler)
    }
  },
  onMessageSent(callback: (data: Message, acknowledgeFn?: (ack: Message) => void) => void) {
    if (!this.socket) {
      console.error('Socket is not initialized')

      return () => {}
    }
    this.socket.on(WS_EVENT_PATH.MESSAGE_SEND, (data, acknowledgeFn) => {
      callback(data, acknowledgeFn)
      if (acknowledgeFn) {
        acknowledgeFn({ status: 'received' })
      }
    })

    return () => {
      this.socket?.off(WS_EVENT_PATH.MESSAGE_SEND)
    }
  },
}
