import { signUpApi } from '@/features/auth/signUp/api/signUpApi'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { configureStore } from '@reduxjs/toolkit/react'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(signUpApi.middleware),
  reducer: {
    [signUpApi.reducerPath]: signUpApi.reducer,
  },
})

setupListeners(store.dispatch)
