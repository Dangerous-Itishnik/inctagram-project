'use client'

import { useSignUpMutation } from '@/features/auth/signUp/api/signUpApi'
import SignUp, { SignUpProps } from '@/features/auth/signUp/ui/SignUp'

export default function SignUpPage() {
  const [signUp] = useSignUpMutation()

  const signUpHandler = (data: SignUpProps) => {
    const signUpData = {
      email: data.Email,
      password: data.Password,
      userName: data.UserName,
    }

    signUp(signUpData)
  }

  return <SignUp onSubmit={signUpHandler} />
}
