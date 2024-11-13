import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  token: null,
}

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    logout: state => {
      state.token = null
      state.isAuthenticated = false
    },
    setCredentials: (state, action) => {
      state.token = action.payload.token
      state.isAuthenticated = true
    },
  },
})

export const { setCredentials } = authSlice.actions
