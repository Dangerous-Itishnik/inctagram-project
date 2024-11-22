export type Message = {
  field?: string
  message?: string
}

export type AuthResponse = {
  error: string
  messages: Message[]
  statusCode: number
}

export type AuthBaseResponse = {
  data: AuthResponse
  status: number
}

export type ArgSignUp = {
  email: string
  password: string
  userName: string
}
export type ArgLogin = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
}

export type ArgConfirmationCode = {
  confirmationCode: string
}
export type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}
