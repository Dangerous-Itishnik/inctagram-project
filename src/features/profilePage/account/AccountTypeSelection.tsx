import { useState } from 'react'

import { Radio } from '@/common/components/RadioGroup'
import { Typography } from '@/common/components/Typography'
import AutoRenewal from '@/features/profilePage/account/AutoRenewar'
import SubscriptionSelection from '@/features/profilePage/account/SubscriptionSelection'
import { ensureSubscriptionsArray } from '@/features/profilePage/account/subscriptionsUtils'
import { AccountType, useGetSubscriptionsQuery } from '@/service/accountAndPayments/account'

const AccountTypeSelection = () => {
  const { data: subscriptionData } = useGetSubscriptionsQuery()
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

  return (
    <>
      <div>
        <Typography variant={'h3'}>Account Type</Typography>
        <div>
          <Radio onValueChange={accountTypeHandler} options={accountOptions} value={accountType} />
        </div>
        {accountType === 'Business' && (
          <>
            <AutoRenewal />
            <SubscriptionSelection />
          </>
        )}
      </div>
    </>
  )
}

export default AccountTypeSelection
