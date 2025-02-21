'use client'
import { useState } from 'react'

import { useModal } from '@/common/hooks/useModal'
import { Modal } from '@/features/posts/ui/postModalContent/Modal'
import { useRouter, useSearchParams } from 'next/navigation'

import { PostContentQuery } from './PostContentQuery'

type Props = {
  closeModal?: () => void
  data
  postId: number
}
export const PostContentQueryModal = ({ closeModal, data, isAuthenticated, postId }: Props) => {
  const [modalType, setModalType] = useState<'edit' | 'view'>('view')

  const [isPostEdit, setIsPostEdit] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    closeModal: closeEditCloseModal,
    isOpen: isEditModalOpen,
    openModal: openEditCloseModal,
  } = useModal()

  const closePost = () => {
    const newParams = new URLSearchParams(searchParams.toString()) // Клонируем текущие параметры

    newParams.delete('postId')
    router.push(`?${newParams.toString()}`, { scroll: false }) // Обновляем URL с новыми параметрами
  }
  const handleCloseEditConfirmModal = () => {
    setModalType('view')
    closeEditCloseModal()
  }
  const closeHandle = () => {
    if (modalType === `edit` && !isPostEdit) {
      openEditCloseModal()
    } else {
      handleCloseEditConfirmModal()
    }
    if (modalType !== 'edit' || !isPostEdit) {
      closePost() && closeModal()
    }
  }

  return (
    <Modal
      isAuthenticated={isAuthenticated}
      onClose={closeHandle}
      open={!!postId}
      title={modalType === 'edit' ? 'Edit post' : ''}
    >
      <PostContentQuery
        closeEditCloseModal={closeEditCloseModal}
        closeModal={closeModal}
        data={data}
        handleCloseEditConfirmModal={handleCloseEditConfirmModal}
        isEditModalOpen={isEditModalOpen}
        isPostEdit={isPostEdit}
        modalType={modalType}
        openEditCloseModal={openEditCloseModal}
        postId={postId}
        setIsPostEdit={setIsPostEdit}
        setModalType={setModalType}
      />
    </Modal>
  )
}
