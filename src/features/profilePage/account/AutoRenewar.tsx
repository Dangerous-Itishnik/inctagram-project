'use client'
import { Checkbox } from '@/common/components/CheckBox/CheckBox'
import { Typography } from '@/common/components/Typography'
import {
  ensureSubscriptionsArray,
  findLatestEndDate,
  formatDate,
} from '@/features/profilePage/account/subscriptionsUtils'
import { useRouter } from '@/i18n/navigation'
import {
  useAutoRenewalMutation,
  useGetSubscriptionsQuery,
} from '@/service/accountAndPayments/account'

import styles from './account.module.scss'
const AutoRenewal = () => {
  const { data: subscriptionData, isLoading } = useGetSubscriptionsQuery()
  const [autoRenewal, { isLoading: isUpdating }] = useAutoRenewalMutation()
  const { refresh } = useRouter()

  const handleAutoRenewal = async (checked: boolean) => {
    try {
      await autoRenewal({ autoRenewal: checked })
      refresh()
    } catch (error) {
      console.error(' Auto-Renewal-Status:', error)
    }
  }
  const subscriptions = ensureSubscriptionsArray(subscriptionData)
  const endDatePayment = findLatestEndDate(subscriptions)

  const hasActiveSubscription = endDatePayment !== null && endDatePayment > new Date()
  const isAutoRenewalEnabled = subscriptionData?.data.autoRenewal

  return (
    <div>
      <Typography variant={'h3'}>Current Subscription</Typography>
      {isLoading && <Typography variant={'body1'}>Loading subscription information...</Typography>}
      {subscriptions.length > 0 && (
        <div>
          {subscriptions.map((sub, index) => {
            const endDate = new Date(sub.endDateOfSubscription)
            const isActive = !isNaN(endDate.getTime()) && endDate > new Date()
            let nextPaymentDate = null

            if (isActive) {
              nextPaymentDate = new Date(endDate.getTime())
              nextPaymentDate.setDate(nextPaymentDate.getDate() + 1)
            }

            return (
              <div className={styles.subContainer} key={index}>
                <>
                  <div className={styles.subDate}>
                    <Typography variant={'body1'}>
                      <strong>Expires at:</strong>{' '}
                      {endDatePayment ? formatDate(endDatePayment) : 'N/A'}
                    </Typography>
                    {nextPaymentDate && (
                      <Typography variant={'body1'}>
                        <strong>Next payment:</strong> {formatDate(nextPaymentDate)}
                      </Typography>
                    )}
                  </div>
                  <div>
                    <Checkbox
                      checked={isAutoRenewalEnabled}
                      disabled={isUpdating || !isActive}
                      label={'Auto-Renewal'}
                      onCheckedChange={handleAutoRenewal}
                    />
                    {!hasActiveSubscription && (
                      <Typography variant={'body1'}>
                        Subscription expired. Purchase a new subscription to enable auto-renewal.
                      </Typography>
                    )}
                  </div>
                </>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AutoRenewal
