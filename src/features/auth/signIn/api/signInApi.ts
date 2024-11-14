import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const signInApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: headers => {
      const token = localStorage.getItem('authToken')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: build => {
    return {
      logIn: build.mutation({
        query: credentials => ({
          body: credentials,
          method: 'POST',
          url: 'auth/login',
        }),
      }),
    }
  },
  reducerPath: 'signInApi',
})

export const { useLogInMutation } = signInApi
