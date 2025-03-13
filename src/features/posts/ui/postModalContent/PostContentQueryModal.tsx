'use client'
import { useState } from 'react'

import { useModal } from '@/common/hooks/useModal'
import { Modal } from '@/features/posts/ui/postModalContent/Modal'
import { useRouter, useSearchParams } from 'next/navigation'

import { PostContentQuery } from './PostContentQuery'

type Props = {
  postId: number
}
export const PostContentQueryModal = ({ postId }: Props) => {
  const [modalType, setModalType] = useState<'edit' | 'view'>('view')

  const [isPostEdit, setIsPostEdit] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const { closeModal: closeEditCloseModal, openModal: openEditCloseModal } = useModal()

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
      closePost()
    }
  }

  return (
    <Modal onClose={closeHandle} open={!!postId} title={modalType === 'edit' ? 'Edit post' : ''}>
      <PostContentQuery
        closeEditCloseModal={closeEditCloseModal}
        closePost={closePost}
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
