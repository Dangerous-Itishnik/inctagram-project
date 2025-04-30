import { Socket, io } from 'socket.io-client'

export const SocketApi = {
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

  socket: null as Socket | null,
}
