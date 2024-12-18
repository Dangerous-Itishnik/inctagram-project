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
    googleLogin: build.mutation<{ accessToken: string; email: string }, { code: string }>({
      invalidatesTags: ['Me'],
      query: code => ({
        body: code,
        method: 'POST',
        url: '/api/v1/auth/google/login',
      }),
    }),
    logIn: build.mutation<LoginResponse, LoginArgs>({
      invalidatesTags: ['Me'], // позволяет выполнить "Me" запрос сразу после логина
      query: credentials => ({
        body: credentials,
        method: 'POST',
        url: '/api/v1/auth/login',
      }),
    }),
    logout: build.mutation<void, void>({
      invalidatesTags: ['Me'],
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
  useGoogleLoginMutation,
  useLazyMeQuery,
  useLogInMutation,
  useLogoutMutation,
  useMeQuery,
  useRegEmailResendMutation,
  useRegistrationConfirmationMutation,
  useRegistrationMutation,
} = authApi
