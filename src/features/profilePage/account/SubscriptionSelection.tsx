'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { Radio } from '@/common/components/RadioGroup'
import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import {
  CostAndPaymentsType,
  CreateSubscriptionType,
  MyPaymentType,
  useGetCostPaymentsQuery,
  useNewSubscriptionMutation,
} from '@/service/accountAndPayments/account'

import styles from './account.module.scss'

const SubscriptionSelection = () => {
  const [selectedSubscription, setSelectedSubscription] = useState<MyPaymentType>()
  const [_, setPaymentUrl] = useState<null | string>(null) // eslint-disable-line @typescript-eslint/no-unused-vars

  const { data: costData } = useGetCostPaymentsQuery()

  const [newSubscription, { isLoading: isSubLoading }] = useNewSubscriptionMutation()

  const handleSubscriptionSelect = (value: string) => {
    setSelectedSubscription(value as MyPaymentType)
  }

  const handleSubscribe = async (paymentType: 'PAYPAL' | 'STRIPE') => {
    const selectedData = costData?.data.find(
      (item: CostAndPaymentsType) => item.typeDescription === selectedSubscription
    )

    if (!selectedData) {
      toast.error('Selected subscription not found')

      return
    }

    const subscriptionBody: CreateSubscriptionType = {
      amount: selectedData.amount,
      baseUrl: window.location.origin,
      paymentType,
      typeSubscription: selectedSubscription!,
    }

    try {
      const response = await newSubscription(subscriptionBody).unwrap()

      setPaymentUrl(response.url)

      if (response) {
        toast.success('Payment was successful!')
        if (response.url) {
          window.location.href = response.url
        }
      } else {
        toast.error('Transaction failed, please try again')
      }

      return response.url
    } catch (error) {
      console.error('Subscription error:', error)
      toast.error('Transaction failed, please try again')
    }
  }

  if (isSubLoading) {
    return <div>Loading subscriptions...</div>
  }

  const priceOptions =
    costData?.data.map((item: CostAndPaymentsType) => ({
      label: `$${item.amount} per ${item.typeDescription}`,
      value: item.typeDescription, // This should match MyPaymentType
    })) || []

  return (
    <div>
      <Typography variant={'h3'}>Your subscription costs:</Typography>
      <div>
        <div className={styles.wrapper}>
          <Radio
            onValueChange={handleSubscriptionSelect}
            options={priceOptions}
            value={selectedSubscription}
          />
        </div>
      </div>

      <div>
        <Typography variant={'h3'}>Payment Options:</Typography>
        <Button onClick={() => handleSubscribe('PAYPAL')}>Pay with PayPal</Button>
        <Button onClick={() => handleSubscribe('STRIPE')}>Pay with Stripe</Button>
      </div>
    </div>
  )
}

export default SubscriptionSelection
