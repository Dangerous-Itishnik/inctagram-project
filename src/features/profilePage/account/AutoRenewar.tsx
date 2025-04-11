'use client'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { Checkbox } from '@/common/components/CheckBox/CheckBox'
import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { Typography } from '@/common/components/Typography'
import { useModal } from '@/common/hooks/useModal'
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
import { useParams, useSearchParams } from 'next/navigation'

import styles from './account.module.scss'
const AutoRenewal = () => {
  const { data: subscriptionData, isLoading } = useGetSubscriptionsQuery()
  const [autoRenewal, { isLoading: isUpdating }] = useAutoRenewalMutation()
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const { refresh } = useRouter()
  const router = useRouter()
  const params = useParams()

  const { closeModal, isOpen, openModal } = useModal()

  const handleAutoRenewal = async (checked: boolean) => {
    try {
      await autoRenewal({ autoRenewal: checked })
      refresh()
      toast.success('Profile updated successfully!', {
        autoClose: 3000,
        position: 'top-center',
      })
      setTimeout(() => {
        const id = Number(params.userId)

        router.push(`/profile/${id}/edit/account`)
      }, 3000)
    } catch (error) {
      toast.error('Please correct the highlighted errors', {
        autoClose: 5000,
        position: 'top-center',
      })
    }
  }

  useEffect(() => {
    if (success) {
      openModal()
    }
  }, [success, openModal])

  const subscriptions = ensureSubscriptionsArray(subscriptionData)
  const endDatePayment = findLatestEndDate(subscriptions)

  const hasActiveSubscription = endDatePayment !== null && endDatePayment > new Date()
  const isAutoRenewalEnabled = subscriptionData?.data.autoRenewal

  return (
    <div>
      <Typography variant={'h3'}>Current Subscription</Typography>
      {isLoading && <Typography variant={'body1'}>Loading subscription information...</Typography>}
      {subscriptions.length > 0 && (
        <div className={styles.subContainer}>
          {subscriptions.map((sub, index) => {
            const endDate = new Date(sub.endDateOfSubscription)
            const isActive = !isNaN(endDate.getTime()) && endDate > new Date()
            let nextPaymentDate = null

            if (isActive) {
              nextPaymentDate = new Date(endDate.getTime())
              nextPaymentDate.setDate(nextPaymentDate.getDate() + 1)
            }

            return (
              <div className={styles.subListContainer} key={index}>
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
              </div>
            )
          })}
        </div>
      )}
      {success ? (
        <InfoModal modalTitle={''} onClose={closeModal} open={isOpen}>
          <Typography variant={'h1'}>Payment was successful!</Typography>
        </InfoModal>
      ) : (
        <InfoModal modalTitle={''} onClose={closeModal} open={isOpen}>
          <Typography variant={'h1'}>Transaction failed, please try again</Typography>
        </InfoModal>
      )}
    </div>
  )
}

export default AutoRenewal
