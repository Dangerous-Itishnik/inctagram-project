import { baseQueryWithReauth } from '@/service/baseQueryWithreauth'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Me', 'Posts', 'getPublic'],
})
