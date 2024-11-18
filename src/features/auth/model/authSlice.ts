import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  email: null | string
  isAuthenticated: boolean
  name: null | string
  token: null | string
}
const initialState: InitialState = {
  email: null,
  isAuthenticated: false,
  name: null,
  token: null,
}

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    deleteCredentials: state => {
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('authToken')
    },
    logout: state => {
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('authToken')
    },
    setCredentials: (state, action) => {
      state.token = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem('authToken', action.payload.token)
    },
  },
})

export const { deleteCredentials, logout, setCredentials } = authSlice.actions
