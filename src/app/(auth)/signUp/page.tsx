'use client'

import SignUp, { SignUpProps } from '@/features/auth/signUp/ui/SignUp'

function handleSubmit(data: SignUpProps) {
  console.log('Form submitted:', data)
}

export default function SignUpPage() {
  return <SignUp onSubmit={handleSubmit} />
}
