// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { storage } from '@/common/utils/storage'
import { Mutex } from 'async-mutex'

import { baseQuery } from './baseQuery'

// create a new mutex
const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        // try to get a new token

        const refreshResult = await baseQuery(
          { method: 'POST', url: '/api/v1/auth/update-tokens' },
          api,
          extraOptions
        )

        if (refreshResult.meta?.response?.status === 200) {
          // retry the initial query
          const { accessToken } = refreshResult.data as { accessToken: string }

          // Сохраняем новый токен в localStorage
          storage.setToken(accessToken)

          // Перезапускаем исходный запрос
          result = await baseQuery(args, api, extraOptions)
        } else {
          const accessToken = storage.getToken()

          accessToken &&
            (await baseQuery(
              {
                method: 'POST',
                url: '/api/v1/auth/logout',
              },
              api,
              extraOptions
            ))
          // storage.deleteToken()
          // TODO: сделать редирект на логин
          // await Router.push('/signIn')
          // toast.error('You are not authorized')
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
