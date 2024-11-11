'use client'

import { useSignInMutation } from '@/features/auth/signIn/api/signInApi'
import SignIn, { PropsSingIn } from '@/features/auth/signIn/ui/SingIn'

export default function SignInPage() {
  const [signIn] = useSignInMutation()

  function handleSubmit(data: PropsSingIn) {
    console.log(data)
    const signInData = {
      email: data.Email,
      password: data.Password,
    }

    signIn(signInData)
  }

  return <SignIn onSubmit={handleSubmit} />
}
