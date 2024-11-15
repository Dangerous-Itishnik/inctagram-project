import { authApi } from '@/features/auth/api/authApi'
import authMiddleware from '@/features/auth/model/authMiddleware'
import { authSlice } from '@/features/auth/model/authSlice'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { configureStore } from '@reduxjs/toolkit/react'

const initialState = {
  auth: {
    email: null,
    isAuthenticated: !!localStorage.getItem('authToken'),
    name: null,
    token: localStorage.getItem('authToken') || null,
  },
}

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, authMiddleware).concat(authMiddleware),

  preloadedState: initialState,
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)
