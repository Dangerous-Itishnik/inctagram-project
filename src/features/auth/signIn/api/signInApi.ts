import { createSelectorHook } from 'react-redux'

import { RootState } from '@/app/store/store'
import { createApi, fetchBaseQuery, reactHooksModule } from '@reduxjs/toolkit/query/react'
import { createSelector } from 'reselect'

export const signInApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
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
