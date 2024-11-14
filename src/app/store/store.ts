import { authApi } from '@/features/auth/api/authApi'
import { authSlice } from '@/features/auth/model/authSlice'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { configureStore } from '@reduxjs/toolkit/react'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)
