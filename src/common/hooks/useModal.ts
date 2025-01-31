import { useState } from 'react'

export const useModal = () => {
  const [modal, setModal] = useState<{ isOpen: boolean; modalId?: number }>({
    isOpen: false,
    modalId: 0,
  })

  function openModal(modalId?: number): void {
    setModal({ isOpen: true, modalId })
  }

  const closeModal = () => {
    setModal({ isOpen: false, modalId: undefined })
  }

  return {
    closeModal,
    isOpen: modal.isOpen,
    openModal,
    modalId: modal.modalId,
  }
}