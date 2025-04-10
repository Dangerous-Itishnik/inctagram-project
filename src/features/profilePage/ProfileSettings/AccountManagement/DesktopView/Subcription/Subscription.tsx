import { useEffect, useState } from 'react'

import {
  useCreateSubscriptionMutation,
  useGetCostOfPaymentSubscriptionQuery,
} from '@/service/subscription/subscription.service'
import { Spinner } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import styles from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/Subcription/subcription.module.scss'

export const Subscription = () => {
  const [subscription, setSubscription] = useState<'DAY' | 'MONTHLY' | 'WEEKLY'>('DAY')
  const { data: getSubscriptions, isLoading } = useGetCostOfPaymentSubscriptionQuery()
  const [createSubscription] = useCreateSubscriptionMutation()
  const params = useSearchParams()
  const router = useRouter()
  const successPathOfUrl = params.get('/?success=true')

  const handleSubscription = (type: 'DAY' | 'MONTHLY' | 'WEEKLY') => {
    setSubscription(type)
  }

  const createSubscriptionHandler = async () => {
    const payload = {
      amount: 0,
      baseUrl: window.location.origin,
      paymentType: 'STRIPE',
      typeSubscription: subscription,
    }

    createSubscription(payload)
      .unwrap()
      .then(response => {
        // Перенаправление на URL из ответа
        window.location.href = response.url
      })
      .catch(error => {
        console.error('Error creating subscription:', error)
      })
  }

  useEffect(() => {
    if (successPathOfUrl) {
      router.replace('/profile/1767/settings')
    }
  }, [successPathOfUrl, router])

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
