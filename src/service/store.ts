import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { baseApi } from "@/service/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "@/service/posts/posts.service";


export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
    .concat(postsApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer
  }
});



export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
