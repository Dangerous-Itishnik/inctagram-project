import {
  useCancelSubscriptionMutation,
  useGetCurrentOfPaymentSubscriptionQuery,
} from '@/service/subscription/subscription.service'
import { Spinner } from '@radix-ui/themes'

import styles from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/CurrentSubscription/currentSubscription.module.scss'
export const CurrentSubscription = () => {
  const { data: getCurrentSubscription, isLoading } = useGetCurrentOfPaymentSubscriptionQuery()
  const [cancelSubscription] = useCancelSubscriptionMutation()

  const formatDate = dateString => {
    return dateString.split('T')[0]
  }

  if (isLoading) {
    return <Spinner />
  }

  const currentDate = new Date()

  const hasActiveSubscription = getCurrentSubscription.data?.some(
    el => new Date(el.endDateOfSubscription) > currentDate
  )

  return (
    <>
      {hasActiveSubscription ? (
        <div className={styles.container}>
          <h3>Current Subscription:</h3>
          <div className={styles.subscription}>
            <div className={styles.expire}>
              <p>Expire at</p>
              <span>{formatDate(getCurrentSubscription.data[0]?.dateOfPayment)}</span>
            </div>
            <div className={styles.nextPayment}>
              <p>Next payment</p>
              <span>{formatDate(getCurrentSubscription.data[0]?.endDateOfSubscription)}</span>
            </div>
          </div>
          <div className={styles.renewal}>
            <input
              checked={getCurrentSubscription.data.some(el => el.autoRenewal === true)}
              type={'checkbox'}
            />
            <p>Auto-Renewal</p>
          </div>
        </div>
      ) : null}
    </>
  )
}
