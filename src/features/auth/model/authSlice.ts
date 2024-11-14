import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  token: null,
}

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    deleteCredentials: state => {
      state.token = null
      state.isAuthenticated = false
      localStorage.delItem('authToken')
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

export const { deleteCredentials, setCredentials } = authSlice.actions
