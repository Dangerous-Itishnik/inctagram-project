import { useState } from 'react'

import { useGetCostOfPaymentSubscriptionQuery } from '@/service/subscription/subscription.service'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/Subcription/subcription.module.scss'

export const Subscription = () => {
  const [subscription, setSubscription] = useState<'10' | '50' | '100'>('10')
  const { data } = useGetCostOfPaymentSubscriptionQuery()

  const handleSubscription = (type: '10' | '50' | '100') => {
    setSubscription(type)
  }

  const handleCheckout = async e => {
    e.preventDefault() // Предотвращаем переход по ссылке

    const subscriptionsToSend = [{ quantity: 1, type: subscription }]

    try {
      const response = await fetch('/api/checkout_sessions', {
        body: JSON.stringify({ subscriptions: subscriptionsToSend }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        const errorData = await response.json()

        throw new Error(`Error: ${errorData.message}`)
      }

      const session = await response.json()

      window.location.href = session.url // Перенаправляем на URL сессии
    } catch (error) {
      console.error('Failed to fetch:', error)
    }
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
          <span>{`$${data.data[0].amount} per ${data.data[0].typeDescription}`}</span>
        </div>
        <div>
          <input
            checked={subscription === '50'}
            onChange={() => handleSubscription('50')}
            type={'checkbox'}
          />
          <span>{`$${data.data[1].amount} per ${data.data[1].typeDescription}`}</span>
        </div>
        <div>
          <input
            checked={subscription === '100'}
            onChange={() => handleSubscription('100')}
            type={'checkbox'}
          />
          <span>{`$${data.data[2].amount} per ${data.data[2].typeDescription}`}</span>
        </div>
      </div>
      <div className={styles.payments}>
        <Link href={''}>
          <Image alt={''} height={64} src={'/paypalLogo.png'} width={96} />
        </Link>
        <p>Or</p>
        {/*<Link href={`/payment`}>*/}
        <Link href={''} onClick={handleCheckout}>
          <Image alt={''} height={64} src={'/stripeLogo.png'} width={96} />
        </Link>
      </div>
    </div>
  )
}
