import { RootState } from '@/app/store/store'

export const tokenSelector = (state: RootState) => state.auth.token
