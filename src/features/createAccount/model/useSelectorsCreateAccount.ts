import { RootState } from '@/app/store/store'

export const selectorIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
