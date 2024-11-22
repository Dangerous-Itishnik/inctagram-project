import { baseURL } from '@/common/api/common.api'
import {
  ArgConfirmationCode,
  ArgLogin,
  ArgSignUp,
  AuthResponse,
  LoginResponse,
  MeResponse,
} from '@/features/auth/api/authApi.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'include',
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
      logIn: build.mutation<LoginResponse, ArgLogin>({
        query: credentials => ({
          body: credentials,
          method: 'POST',
          url: 'auth/login',
        }),
      }),
      me: build.query<MeResponse, void>({
        query: () => ({
          method: 'GET',
          url: 'auth/me',
        }),
      }),
      registration: build.mutation<AuthResponse, ArgSignUp>({
        query: data => {
          return {
            body: data,
            method: 'POST',
            url: 'auth/registration',
          }
        },
      }),
      registrationConfirmation: build.mutation<AuthResponse, ArgConfirmationCode>({
        query: confirmationCode => {
          return {
            body: confirmationCode,
            method: 'POST',
            url: 'auth/registration-confirmation',
          }
        },
      }),
    }
  },

  reducerPath: 'authApi',
})

export const {
  useLogInMutation,
  useMeQuery,
  useRegistrationConfirmationMutation,
  useRegistrationMutation,
} = authApi
