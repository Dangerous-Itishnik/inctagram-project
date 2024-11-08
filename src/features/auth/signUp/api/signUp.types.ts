export type SignUpResponseType = {
  error: 'string'
  messages: [
    {
      field: 'string'
      message: 'string'
    },
  ]
  statusCode: number
}

export type ArgSignUpType = {
  email: string
  password: string
  userName: string
}
