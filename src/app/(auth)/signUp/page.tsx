import { Button } from '@/app/components/button'
import Link from 'next/link'

export default function SignUp() {
  return (
    <>
      <h1>Sign up page</h1>
      <Button as={Link} href={'/'}>
        Go Home
      </Button>
    </>
  )
}
