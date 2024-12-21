import { storage } from '@/common/utils/storage'
import { useLogoutMutation } from '@/service/auth'
import { useRouter } from 'next/navigation'

import styles from './LogoutModal.module.scss'

import { Button } from '../../button'
import { Modal } from '../Modal'

type Props = {
  email: string
  onClose: () => void
}

export const LogoutModal = ({ email, onClose }: Props) => {
  const { replace } = useRouter()
  const [logout] = useLogoutMutation()

  const logoutHandle = async () => {
    storage.deleteToken()
    await logout()
    onClose()
    replace('/')
  }

  return (
    <Modal onClose={onClose} title={'Logout'}>
      <p>Are you really want to log out of your account {email}?</p>
      <div className={styles.modalLogoutButtons}>
        <Button onClick={logoutHandle} variant={'outline'}>
          Yes
        </Button>
        <Button onClick={onClose} variant={'primary'}>
          No
        </Button>
      </div>
    </Modal>
  )
}
