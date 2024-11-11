type Message = {
  field: string
  message: string
}

export type AuthResponse = {
  error: string
  messages: Message[]
  statusCode: number
}

export type ArgSignUp = {
  email: string
  password: string
  userName: string
}

export type ArgConfirmationCode = {
  confirmationCode: string
}
