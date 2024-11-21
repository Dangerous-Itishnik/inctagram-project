import { BASE_URL } from '@/common/api/common.api'
import { STORAGE } from '@/common/utils/storage'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: headers => {
    const token = STORAGE.getToken()

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})
