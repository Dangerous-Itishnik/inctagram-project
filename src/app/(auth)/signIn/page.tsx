'use client'

import SignIn, { PropsSingIn } from '@/common/components/auth/SingIn'

function handleSubmit(data: PropsSingIn) {
  console.log('Form submitted:', data)
}

export default function SignInPage() {
  return <SignIn onSubmit={handleSubmit} />
}
