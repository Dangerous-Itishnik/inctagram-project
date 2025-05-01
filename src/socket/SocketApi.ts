import { Socket, io } from 'socket.io-client'

export const socketApi = {
  createConnection(token: string) {
    if (this.socket) {
      this.socket.disconnect()
    }
    this.socket = io('https://inctagram.work', {
      autoConnect: true,
      query: {
        accessToken: token,
      },
    })

    this.socket.on('connect', () => {
      console.log('WS connected')
    })

    this.socket.on('disconnect', () => {
      console.log('WS disconnected')
    })

    this.socket.on('connect_error', error => {
      console.log('WS error:', error.message)
    })
  },

  socket: null as Socket | null,
}
