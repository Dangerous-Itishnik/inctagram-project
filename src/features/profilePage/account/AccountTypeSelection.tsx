'use client'
import { useState } from 'react'

import { Radio } from '@/common/components/RadioGroup'
import { Typography } from '@/common/components/Typography'
import AutoRenewal from '@/features/profilePage/account/AutoRenewar'
import { PaymentSuccessHandler } from '@/features/profilePage/account/PaymentSuccessHandler'
import SubscriptionSelection from '@/features/profilePage/account/SubscriptionSelection'
import { ensureSubscriptionsArray } from '@/features/profilePage/account/subscriptionsUtils'
import { AccountType, useGetSubscriptionsQuery } from '@/service/accountAndPayments/account'
import { Spinner } from '@radix-ui/themes'

import styles from './account.module.scss'

const AccountTypeSelection = () => {
  const { data: subscriptionData, isLoading } = useGetSubscriptionsQuery()
  const subscriptions = ensureSubscriptionsArray(subscriptionData)
  const initialAccountType = subscriptions.some(sub => {
    const endDate = new Date(sub.endDateOfSubscription)

    return !isNaN(endDate.getTime()) && endDate > new Date()
  })
    ? 'Business'
    : 'Personal'

  const [accountType, setAccountType] = useState<AccountType>(initialAccountType)
  const accountTypeHandler = (value: string) => {
    setAccountType(value as AccountType)
  }
  const accountOptions = [
    {
      label: 'Personal',
      value: 'Personal',
    },
    {
      label: 'Business',
      value: 'Business',
    },
  ]

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <PaymentSuccessHandler onSetAccountType={setAccountType} />
      <div className={styles.accountContainer}>
        <Typography variant={'h2'}>Account Type</Typography>
        <div className={styles.firstContainer}>
          <Radio onValueChange={accountTypeHandler} options={accountOptions} value={accountType} />
        </div>
        {accountType === 'Business' && (
          <div className={styles.accountContainer}>
            <AutoRenewal />
            <SubscriptionSelection />
          </div>
        )}
      </div>
    </>
  )
}

export default AccountTypeSelection
