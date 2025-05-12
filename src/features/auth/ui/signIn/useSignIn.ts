import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useLogInMutation } from '@/features/auth/api/authApi'
import { deleteCredentials, setCredentials } from '@/features/auth/model/authSlice'
import { useRouter } from 'next/navigation'

export type PropsSingIn = {
  email: string
  password: string
}

export const useSignIn = () => {
  //TODO Так ли надо выносиь логику в другую компоненту
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<PropsSingIn>({
    mode: 'onBlur',
  })
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const [login] = useLogInMutation()
  const [authError, setAuthError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const loginHandle = async (data: PropsSingIn) => {
    try {
      const userData = await login(data).unwrap()

      dispatch(setCredentials({ token: userData.accessToken }))
      push('/createAccount')
      reset()
    } catch (error) {
      setAuthError(true)
      setErrorMessage('The email or password are incorrect. Try again please')
      dispatch(deleteCredentials())
    }
  }

  return {
    authError,
    clearErrors,
    errorMessage,
    errors,
    handleSubmit,
    loginHandle,
    register,
    reset,
    setAuthError,
  }
}
