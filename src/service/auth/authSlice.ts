import { PayloadAction, createSlice } from '@reduxjs/toolkit'
type InitialState = {
  email: null | string
  isBlocked: boolean
  userId: null | number
  userName: null | string
}
const initialState: InitialState = {
  email: null,
  isBlocked: false,
  userId: null,
  userName: null,
}

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setAuthState: (state, action: PayloadAction<InitialState>) => {
      console.log(action, 'action')
      state.email = action.payload.email
      state.isBlocked = action.payload.isBlocked
      state.userId = action.payload.userId
      state.userName = action.payload.userName
    },
  },
})

export const { setAuthState } = authSlice.actions
export const authReducers = authSlice.reducer
