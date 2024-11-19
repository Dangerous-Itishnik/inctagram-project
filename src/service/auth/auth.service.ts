import {
  ArgConfirmationCode,
  ArgLogin,
  ArgSignUp,
  AuthResponse,
  LoginResponse,
} from '@/features/auth/api/authApi.type'
import { baseApi } from '@/service/baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createAccessToken: build.mutation<void, void>({
      query: () => ({ method: 'POST', url: 'update-token' }),
    }),
    logIn: build.mutation<LoginResponse, ArgLogin>({
      query: credentials => ({
        body: credentials,
        method: 'POST',
        url: 'auth/login',
      }),
    }),
    registration: build.mutation<AuthResponse, ArgSignUp>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/registration',
      }),
    }),
    registrationConfirmation: build.mutation<AuthResponse, ArgConfirmationCode>({
      query: confirmationCode => ({
        body: confirmationCode,
        method: 'POST',
        url: 'auth/registration-confirmation',
      }),
    }),
  }),
})

export const { useLogInMutation, useRegistrationConfirmationMutation, useRegistrationMutation } =
  authApi
