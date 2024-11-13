import { useDispatch, useSelector } from 'react-redux'

import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { signInApi } from '@/features/auth/signIn/api/signInApi'
import { authSlice, setCredentials } from '@/features/auth/signIn/model/authSlice'
import { signUpApi } from '@/features/auth/signUp/api/signUpApi'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { configureStore } from '@reduxjs/toolkit/react'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(signUpApi.middleware).concat(signInApi.middleware),
  reducer: {
    auth: authSlice.reducer,
    [signInApi.reducerPath]: signInApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)
