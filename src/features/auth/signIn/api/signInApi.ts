import { RootState } from '@/app/store/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const signInApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.auth.token

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
