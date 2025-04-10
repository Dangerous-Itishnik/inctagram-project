import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { Button } from '@/common/components/button'

import styles from '@/common/components/Modals/PaymentModals/CreatePayment/createPayment.module.scss'

export const CreatePayment = () => {
  return (
    <div>
      <InfoModal modalTitle={'Create payment'} open>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.description}>
              <p>
                Auto-renewal will be enabled with this payment. You can disable it anytime in your
                profile settings
              </p>
            </div>
            <div className={styles.settings}>
              <input type={'checkbox'} />
              <p>I agree</p>
              <Button>OK</Button>
            </div>
          </div>
        </div>
      </InfoModal>
    </div>
  )
}
