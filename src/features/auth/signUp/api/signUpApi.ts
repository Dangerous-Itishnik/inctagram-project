import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ArgConfirmationCode, ArgSignUp, AuthResponse } from './signUp.types'

export const signUpApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),

  endpoints: build => {
    return {
      registrationConfirmation: build.mutation<AuthResponse, ArgConfirmationCode>({
        query: confirmationCode => {
          return {
            body: confirmationCode,
            method: 'POST',
            url: 'auth/registration-confirmation',
          }
        },
      }),
      signUp: build.mutation<AuthResponse, ArgSignUp>({
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

export const { useRegistrationConfirmationMutation, useSignUpMutation } = signUpApi
