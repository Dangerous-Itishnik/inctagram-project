import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { Button } from '@/common/components/button'

import styles from '@/common/components/Modals/PaymentModals/Success/success.module.scss'

export const Success = () => {
  return (
    <div>
      <InfoModal modalTitle={'Success'} open>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.description}>
              <p>Success Payment was successful!</p>
              <Button className={styles.button}>OK</Button>
            </div>
          </div>
        </div>
      </InfoModal>
    </div>
  )
}
