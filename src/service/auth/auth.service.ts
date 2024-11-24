import { baseApi } from '@/service/baseApi'

import {
  ArgConfirmationCode,
  AuthResponse,
  LoginArgs,
  LoginResponse,
  MeResponse,
  SignUpArgs,
} from './auth.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    logIn: build.mutation<LoginResponse, LoginArgs>({
      invalidatesTags: ['Me'], // позволяет выполнить "Me" запрос сразу после логина
      query: credentials => ({
        body: credentials,
        method: 'POST',
        url: '/api/v1/auth/login',
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({ credentials: 'include', method: 'POST', url: '/api/v1/auth/logout' }),
    }),
    me: build.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => '/api/v1/auth/me',
    }),
    registration: build.mutation<AuthResponse, SignUpArgs>({
      query: data => ({
        body: data,
        method: 'POST',
        url: '/api/v1/auth/registration',
      }),
    }),
    registrationConfirmation: build.mutation<AuthResponse, ArgConfirmationCode>({
      query: confirmationCode => ({
        body: confirmationCode,
        method: 'POST',
        url: '/api/v1/auth/registration-confirmation',
      }),
    }),
  }),
})

export const {
  useLazyMeQuery,
  useLogInMutation,
  useLogoutMutation,
  useMeQuery,
  useRegistrationConfirmationMutation,
  useRegistrationMutation,
} = authApi
