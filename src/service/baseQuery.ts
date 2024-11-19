import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work/api/v1/',
  credentials: 'include',
  prepareHeaders: headers => {
    const token = (typeof window !== 'undefined' && localStorage.getItem('accessToken')) || null

    //console.log({token});
    if (headers.get('Authorization')) {
      return headers
    }
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})
