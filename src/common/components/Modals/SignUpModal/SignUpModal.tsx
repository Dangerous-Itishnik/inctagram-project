import styles from './SignUpModal.module.scss'

import { Button } from '../../button'
import { Modal } from '../Modal'

type Props = {
  email: string
  onClose: () => void
}

export const SignUpModal = ({ email, onClose }: Props) => {
  return (
    <Modal onClose={onClose} title={'Email sent'}>
      <p>
        We have sent a link to confirm your email to
        {email}
      </p>
      <Button className={styles.confirmButton} onClick={onClose}>
        OK
      </Button>
    </Modal>
  )
}
