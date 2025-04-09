import { Checkbox } from '@/common/components/CheckBox/CheckBox'
import { Typography } from '@/common/components/Typography'
import {
  calculateNextPaymentDate,
  ensureSubscriptionsArray,
  findLatestEndDate,
  formatDate,
} from '@/features/profilePage/account/subscriptionsUtils'
import { useRouter } from '@/i18n/navigation'
import {
  useAutoRenewalMutation,
  useGetSubscriptionsQuery,
} from '@/service/accountAndPayments/account'

const AutoRenewal = () => {
  const { data: subscriptionData, isLoading } = useGetSubscriptionsQuery()
  const [autoRenewal, { isLoading: isUpdating }] = useAutoRenewalMutation()
  const { refresh } = useRouter()

  const subscriptions = ensureSubscriptionsArray(subscriptionData)
  const handleAutoRenewal = async (checked: boolean) => {
    try {
      await autoRenewal({ autoRenewal: checked })
      refresh()
    } catch (error) {
      console.error(' Auto-Renewal-Status:', error)
    }
  }

  const endDatePayment = findLatestEndDate(subscriptions)
  const nextPaymentDate = calculateNextPaymentDate(subscriptions)

  // Get auto-renewal status
  const isAutoRenewalEnabled = subscriptionData?.hasAutoRenewal || false

  return (
    <div>
      <Typography variant={'h3'}>Current Subscription</Typography>
      {isLoading && <Typography variant={'body1'}>Loading subscription information...</Typography>}
      {subscriptionData && (
        <div>
          <Typography variant={'body1'}>
            <strong>Expires at:</strong> {formatDate(endDatePayment)}
          </Typography>
          <Typography variant={'body1'}>
            <strong>Next payment:</strong> {formatDate(nextPaymentDate)}
          </Typography>
          <div>
            <Checkbox
              checked={isAutoRenewalEnabled}
              disabled={isUpdating}
              label={'Auto-Renewal'}
              onCheckedChange={handleAutoRenewal}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AutoRenewal
