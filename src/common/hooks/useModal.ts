import { useState } from 'react'

export const useModal = () => {
  const [modalState, setModalState] = useState<{ isOpen: boolean }>({isOpen: false})

  function openModal(): void {
    setModalState({ isOpen: true})
  }

  const closeModal = () => {
    setModalState({ isOpen: false})
  }

  return {
    closeModal,
    isOpen: modalState.isOpen,
    openModal,
  }
}