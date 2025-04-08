import { useState } from 'react'

import {
  useCreateSubscriptionMutation,
  useGetCostOfPaymentSubscriptionQuery,
} from '@/service/subscription/subscription.service'
import { Spinner } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/Subcription/subcription.module.scss'

export const Subscription = () => {
  const [subscription, setSubscription] = useState<'10' | '50' | '100'>('10')
  const { data: getSubscriptions, isLoading } = useGetCostOfPaymentSubscriptionQuery()
  const [createSubscription] = useCreateSubscriptionMutation()

  const handleSubscription = (type: '10' | '50' | '100') => {
    setSubscription(type)
  }

  const createSubscriptionHandler = async () => {
    const payload = {
      amount: 10,
      baseUrl: window.location.origin,
      paymentType: 'STRIPE',
      typeSubscription: subscription,
    }

    try {
      const response = await createSubscription(payload).unwrap()

      // Перенаправление на URL из ответа
      window.location.href = response.url
    } catch (error) {
      console.error('Error creating subscription:', error)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className={styles.container}>
      <h3>Your subscription costs:</h3>
      <div className={styles.subscription}>
        {getSubscriptions.data?.map((sub, index) => (
          <div key={index}>
            <input
              checked={subscription === sub.typeDescription}
              onChange={() => handleSubscription(sub.typeDescription)}
              type={'checkbox'}
            />
            <span>{`$${sub.amount} per ${sub.typeDescription}`}</span>
          </div>
        ))}
      </div>
      <div className={styles.payments}>
        <Link href={''}>
          <Image alt={''} height={64} src={'/paypalLogo.png'} width={96} />
        </Link>
        <p>Or</p>
        <Link href={''} onClick={createSubscriptionHandler}>
          <Image alt={''} height={64} src={'/stripeLogo.png'} width={96} />
        </Link>
      </div>
    </div>
  )
}
