import { useEffect, useState } from 'react'

import {
  CreateSubscriptionPayload,
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
  const [paymentStatus, setPaymentStatus] = useState<'error' | 'success' | null>(null)
  const { data: getSubscriptions, isLoading } = useGetCostOfPaymentSubscriptionQuery()
  const [createSubscription] = useCreateSubscriptionMutation()
  const searchParams = useSearchParams()
  // const router = useRouter()
  const success = searchParams.get('success')

  const handleSubscription = (type: 'DAY' | 'MONTHLY' | 'WEEKLY') => {
    setSubscription(type)
  }

  const createSubscriptionHandler = async () => {
    const payload: CreateSubscriptionPayload = {
      amount: 0,
      // baseUrl: window.location.origin,
      baseUrl: window.location.href.split('?')[0],
      paymentType: 'STRIPE',
      typeSubscription: subscription,
    }

    try {
      const response = await createSubscription(payload).unwrap()

      await new Promise(resolve => setTimeout(resolve, 1000))
      window.location.href = response.url
    } catch (error) {
      console.error('Error creating subscription:', error)
    }
    // createSubscription(payload)
    //   .unwrap()
    //   .then(response => {
    //     // Перенаправление на URL из ответа
    //     window.location.href = response.url
    //   })
    //   .catch(error => {
    //     console.error('Error creating subscription:', error)
    //   })
  }

  useEffect(() => {
    if (success !== null) {
      setPaymentStatus(success === 'true' ? 'success' : 'error')

      // onSetAccountType('Business')

      // openModal()

      // Clean URL without reloading
      const url = new URL(window.location.href)

      url.searchParams.delete('success')
      window.history.replaceState({}, '', url.toString())
    }
  }, [success])

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
