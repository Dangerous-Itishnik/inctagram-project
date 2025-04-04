'use client'
import { Button } from '@/common/components/button'

import styles from '../../features/profilePage/ProfileSettings/AccountManagement/DesktopView/Checkout/checkout.module.scss'

export default async function IndexPage({ searchParams }) {
  const { canceled } = await searchParams

  if (canceled) {
    console.log('Order canceled -- continue to shop around and checkout when you’re ready.')
  }

  return (
    <form action={'/api/checkout_sessions'} method={'POST'}>
      <section className={styles.section}>
        <p>To continue payment please proceed to checkout.</p>
        <Button role={'link'} type={'submit'}>
          Checkout
        </Button>
      </section>
    </form>
  )
}
