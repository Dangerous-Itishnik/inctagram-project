// authMiddleware.ts
import { Middleware } from 'redux'

import { deleteCredentials, logout, setCredentials } from './authSlice'

const authMiddleware: Middleware = () => next => action => {
  if (setCredentials.match(action)) {
    localStorage.setItem('authToken', action.payload.token)
  } else if (deleteCredentials.match(action) || logout.match(action)) {
    localStorage.removeItem('authToken')
  }

  return next(action)
}

export default authMiddleware
