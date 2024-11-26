import { baseApi } from '@/service/baseApi'

import {
  ArgConfirmationCode,
  AuthResponse,
  LoginArgs,
  LoginResponse,
  MeResponse,
  RegEmailResendArg,
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
    regEmailResend: build.mutation<AuthResponse, RegEmailResendArg>({
      query: email => ({
        body: email,
        method: 'POST',
        url: '/api/v1/auth/registration-email-resending',
      }),
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
  useRegEmailResendMutation,
  useRegistrationConfirmationMutation,
  useRegistrationMutation,
} = authApi
