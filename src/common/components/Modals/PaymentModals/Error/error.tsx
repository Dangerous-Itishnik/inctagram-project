import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { Button } from '@/common/components/button'

import styles from '@/common/components/Modals/PaymentModals/Error/error.module.scss'

export const Error = () => {
  return (
    <div>
      <InfoModal modalTitle={'Error'} open>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.description}>
              <p>Error Transaction failed. Please, write to support Back to payment</p>
              <Button className={styles.backButton}>Back to payment</Button>
            </div>
          </div>
        </div>
      </InfoModal>
    </div>
  )
}
