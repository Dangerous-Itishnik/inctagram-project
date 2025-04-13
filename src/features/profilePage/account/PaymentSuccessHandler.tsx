import React, { useEffect, useState } from 'react'

import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import { useModal } from '@/common/hooks/useModal'
import { useSearchParams } from 'next/navigation'

import styles from './account.module.scss'

interface PaymentSuccessHandlerProps {
  onSetAccountType: (type: 'Business' | 'Personal') => void
}

export const PaymentSuccessHandler: React.FC<PaymentSuccessHandlerProps> = ({
  onSetAccountType,
}) => {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const [paymentStatus, setPaymentStatus] = useState<'error' | 'success' | null>(null)
  const { closeModal, isOpen, openModal } = useModal()

  useEffect(() => {
    if (success !== null) {
      setPaymentStatus(success === 'true' ? 'success' : 'error')

      onSetAccountType('Business')

      openModal()

      // Clean URL without reloading
      const url = new URL(window.location.href)

      url.searchParams.delete('success')
      window.history.replaceState({}, '', url.toString())
    }
  }, [success, openModal, onSetAccountType])

  return (
    <InfoModal
      modalTitle={paymentStatus === 'success' ? 'SUCCESS' : 'Error'}
      onClose={closeModal}
      open={isOpen}
    >
      <div className={styles.successConatiener}>
        <Typography className={styles.title} variant={'h1'}>
          {paymentStatus === 'success'
            ? 'Payment was successful!'
            : 'Transaction failed, please try again'}
        </Typography>
        <Button style={{ padding: '3px', width: '100%' + '' }} variant={'primary'}>
          <Typography variant={'h1'}>
            {paymentStatus === 'success' ? 'OK' : 'Back to payment'}
          </Typography>
        </Button>
      </div>
    </InfoModal>
  )
}
