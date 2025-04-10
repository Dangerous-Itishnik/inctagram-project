'use client'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Checkbox } from '@/common/components/CheckBox'
import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { Radio } from '@/common/components/RadioGroup'
import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import { useModal } from '@/common/hooks/useModal'
import {
  CostAndPaymentsType,
  CreateSubscriptionType,
  MyPaymentType,
  useGetCostPaymentsQuery,
  useNewSubscriptionMutation,
} from '@/service/accountAndPayments/account'

import styles from './account.module.scss'

const SubscriptionSelection = () => {
  const { data: costData } = useGetCostPaymentsQuery()
  const [selectedSubscription, setSelectedSubscription] = useState<MyPaymentType>(
    costData?.data[0]?.typeDescription as MyPaymentType
  )
  const [_, setPaymentUrl] = useState<null | string>(null) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [agreed, setAgreed] = useState(false)
  const [selectedPaymentType, setSelectedPaymentType] = useState<'PAYPAL' | 'STRIPE'>()

  const [newSubscription, { isLoading: isSubLoading }] = useNewSubscriptionMutation()
  const { closeModal, isOpen, openModal } = useModal()

  useEffect(() => {
    if (costData?.data?.length) {
      setSelectedSubscription(costData.data[0].typeDescription as MyPaymentType)
    }
  }, [costData])

  const handleSubscriptionSelect = (value: string) => {
    setSelectedSubscription(value as MyPaymentType)
  }
  const handlePaymentInitiation = (paymentType: 'PAYPAL' | 'STRIPE') => {
    if (!selectedSubscription) {
      toast.error('Please select a subscription first')

      return
    }
    setSelectedPaymentType(paymentType)
    openModal()
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
    } finally {
      closeModal()
    }
  }

  if (isSubLoading) {
    return <div>Loading subscriptions...</div>
  }

  const priceOptions =
    costData?.data.map((item: CostAndPaymentsType) => ({
      label: `$${item.amount} per ${item.typeDescription}`,
      value: item.typeDescription,
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
        <Button onClick={() => handlePaymentInitiation('PAYPAL')}>PayPal</Button>
        <Button onClick={() => handlePaymentInitiation('STRIPE')}>Stripe</Button>
      </div>
      <InfoModal modalTitle={'Create Payment'} onClose={closeModal} open={isOpen}>
        <div className={styles.checkBoxContainer}>
          <Typography variant={'body1'}>
            Auto-renewal will be enabled with this <br /> payment. You can disable it anytime in
            your <br /> profile settings
          </Typography>
          <div className={styles.checkBoxandButton}>
            <Checkbox
              checked={agreed}
              label={'I agree'}
              onCheckedChange={checked => setAgreed(!!checked)}
            />
            <Button
              disabled={!agreed}
              onClick={() => handleSubscribe(selectedPaymentType!)}
              type={'button'}
              variant={'primary'}
            >
              OK
            </Button>
          </div>
        </div>
      </InfoModal>
    </div>
  )
}

export default SubscriptionSelection
