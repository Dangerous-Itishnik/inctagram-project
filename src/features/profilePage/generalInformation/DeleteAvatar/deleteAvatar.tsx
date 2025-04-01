import { useState } from 'react'
import { toast } from 'react-toastify'

import { Close } from '@/assets/icons/components'
import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import { useModal } from '@/common/hooks/useModal'
import { useRouter } from '@/i18n/navigation'
import { useDeleteAvatarMutation } from '@/service/avatar/avatar.servise'

import styles from './deleteAvatar.module.scss'

export const DeleteAvatar = () => {
  const [isButtonDisable, setButtonDisable] = useState(false)
  const [deleteAvatar] = useDeleteAvatarMutation()
  const { closeModal, isOpen, openModal: deleteModalopen } = useModal()
  const { refresh } = useRouter()
  const avatarDelete = async () => {
    setButtonDisable(true)
    try {
      await deleteAvatar().unwrap()
      setButtonDisable(true)
      closeModal()
      refresh()
      toast.success('Photo delete is successful!', {
        autoClose: 3000,
        position: 'top-center',
      })
    } catch (error) {
      toast.error('Failed to delete photo')
      setButtonDisable(false)
    } finally {
      setButtonDisable(false)
    }
  }

  return (
    <div>
      <div onClick={deleteModalopen}>
        <Close />
      </div>
      <InfoModal
        modalTitle={'Delete Photo'}
        onClose={closeModal}
        open={isOpen}
        style={{ height: '240px', width: '438px' }}
      >
        <div className={styles.deleteContainer}>
          <Typography variant={'body1'}>Are you sure you want to delete the photo?</Typography>
          <div className={styles.duo}>
            <Button onClick={avatarDelete} variant={'outline'}>
              Yes
            </Button>
            <Button disabled={isButtonDisable} onClick={closeModal} variant={'primary'}>
              No
            </Button>
          </div>
        </div>
      </InfoModal>
    </div>
  )
}

export default DeleteAvatar
