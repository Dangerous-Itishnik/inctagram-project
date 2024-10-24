import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Link href={'/signUp'}>signUp</Link>
      <br />
      <Link href={'/signIn'}>signIn</Link>
      <br />
      <Link href={'/profile'}>profile</Link>
    </>
  )
}
