import { RootState } from '@/app/store/store'

export const selectorToken = (state: RootState) => state.auth.token
