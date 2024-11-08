import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ArgSignUpType, SignUpResponseType } from './signUp.types'

export const signUpApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),

  endpoints: build => {
    return {
      signUp: build.mutation<SignUpResponseType, ArgSignUpType>({
        query: data => {
          return {
            body: data,
            method: 'POST',
            url: 'auth/registration',
          }
        },
      }),
    }
  },

  reducerPath: 'signUpApi',
})

export const { useSignUpMutation } = signUpApi
