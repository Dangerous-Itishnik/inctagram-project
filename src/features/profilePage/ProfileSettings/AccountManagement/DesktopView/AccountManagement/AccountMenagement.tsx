import { useState } from 'react'

import { CreatePayment } from '@/common/components/Modals/PaymentModals/CreatePayment'
import { Error } from '@/common/components/Modals/PaymentModals/Error'
import { Success } from '@/common/components/Modals/PaymentModals/Success'
import { CurrentSubscription } from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/CurrentSubscription/CurrentSubscription'
import { Subscription } from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/Subcription/Subscription'
import { useGetCurrentOfPaymentSubscriptionQuery } from '@/service/subscription/subscription.service'

import styles from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/AccountManagement/accountManagement.module.scss'

export const AccountManagement = () => {
  const [selectedAccountType, setSelectedAccountType] = useState<'business' | 'personal'>(
    'personal'
  )
  const { data: getCurrentSubscription, isLoading } = useGetCurrentOfPaymentSubscriptionQuery()

  const handleAccountTypeChange = (type: 'business' | 'personal') => {
    setSelectedAccountType(type)
  }

  return (
    <div className={styles.container}>
      {/*<CreatePayment />*/}
      {/*<Error />*/}
      {/*<Success />*/}
      <h3>Account type:</h3>
      <div className={styles.settings}>
        <div>
          <input
            checked={selectedAccountType === 'personal'}
            onChange={() => handleAccountTypeChange('personal')}
            type={'checkbox'}
          />
          <span>Personal</span>
        </div>
        <div>
          <input
            checked={selectedAccountType === 'business'}
            onChange={() => handleAccountTypeChange('business')}
            type={'checkbox'}
          />
          <span>Business</span>
        </div>
      </div>
      <CurrentSubscription />
      {selectedAccountType === 'business' && (
        <Subscription selectAccountType={selectedAccountType} />
      )}
    </div>
  )
}
