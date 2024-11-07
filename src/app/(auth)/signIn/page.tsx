'use client'

import SignIn, { PropsSingIn } from '@/features/auth/signIn/ui/SingIn'

function handleSubmit(data: PropsSingIn) {
  console.log('Form submitted:', data)
}

export default function SignInPage() {
  return <SignIn onSubmit={handleSubmit} />
}
