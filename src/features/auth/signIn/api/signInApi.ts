import { ArgSignIn } from '@/features/auth/signIn/api/signIn.types'
import { AuthResponse } from '@/features/auth/signUp/api/signUp.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const signInApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api/v1/',
  }),
  endpoints: build => {
    return {
      signIn: build.mutation<any, ArgSignIn>({
        query: login => {
          console.log('data', login)

          return {
            body: login,
            method: 'POST',
            url: 'auth/login',
          }
        },
      }),
    }
  },
  reducerPath: 'signInApi',
})

export const { useSignInMutation } = signInApi
