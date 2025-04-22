import { Socket, io } from 'socket.io-client'

export class SocketApi {
  static socket: Socket | null = null

  static createConnection(token: string) {
    const queryParams = {
      query: {
        accessToken: token,
      },
    }

    this.socket = io('https://inctagram.work', queryParams)

    this.socket.on('connect', () => {
      console.log('socket connected')
    })

    this.socket.on('disconnect', e => {
      console.log('socket disconnected', e)
    })
  }
}
