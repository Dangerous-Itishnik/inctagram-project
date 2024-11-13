import { RootState, useAppSelector } from '@/app/store/store'

export const selectorToken = useAppSelector((state: RootState) => state.auth.token)
