import { useSelector } from 'react-redux'

import { RootState } from '@/service/store'

export const useAppSelector = useSelector.withTypes<RootState>()
