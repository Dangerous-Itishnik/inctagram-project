import { useState } from 'react'

import { useMeQuery } from '@/service/auth'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/subcription.module.scss'

export const Subscription = () => {
  const [subscription, setSubscription] = useState<'10' | '50' | '100'>('10')
  const { data: me } = useMeQuery()

  const handleSubscription = (type: '10' | '50' | '100') => {
    setSubscription(type)
  }

  return (
    <div className={styles.container}>
      <h3>Your subscription costs:</h3>
      <div className={styles.subscription}>
        <div>
          <input
            checked={subscription === '10'}
            onChange={() => handleSubscription('10')}
            type={'checkbox'}
          />
          <span>$10 per 1 Day</span>
        </div>
        <div>
          <input
            checked={subscription === '50'}
            onChange={() => handleSubscription('50')}
            type={'checkbox'}
          />
          <span>$50 per 7 Day</span>
        </div>
        <div>
          <input
            checked={subscription === '100'}
            onChange={() => handleSubscription('100')}
            type={'checkbox'}
          />
          <span>$100 per month</span>
        </div>
      </div>
      <div className={styles.payments}>
        <Link href={''}>
          <Image alt={''} height={64} src={'/paypalLogo.png'} width={96} />
        </Link>
        <p>Or</p>
        <Link href={`/payment`}>
          <Image alt={''} height={64} src={'/stripeLogo.png'} width={96} />
        </Link>
      </div>
    </div>
  )
}
