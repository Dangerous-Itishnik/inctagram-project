import {
  useCancelSubscriptionMutation,
  useGetCurrentOfPaymentSubscriptionQuery,
} from '@/service/subscription/subscription.service'
import { Spinner } from '@radix-ui/themes'

import styles from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/CurrentSubscription/currentSubscription.module.scss'
export const CurrentSubscription = () => {
  const { data: getCurrentSubscription, isLoading } = useGetCurrentOfPaymentSubscriptionQuery()
  const [cancelSubscription] = useCancelSubscriptionMutation()

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className={styles.container}>
      <h3>Current Subscription:</h3>
      <div className={styles.subscription}>
        <div className={styles.expire}>
          <p>Expire at</p>
          <span>{getCurrentSubscription.data[0]?.dateOfPayment}</span>
        </div>
        <div className={styles.nextPayment}>
          <p>Next payment</p>
          <span>{getCurrentSubscription.data[0]?.endDateOfSubscription}</span>
        </div>
      </div>
      <div className={styles.renewal}>
        <input checked={getCurrentSubscription.hasAutoRenewal} type={'checkbox'} />
        <p>Auto-Renewal</p>
      </div>
    </div>
  )
}
