import React from "react";
import styles from './Modal.module.scss';

type ModalProps = {
  onClose: () => void;
  isOpen: boolean
  children: React.ReactNode;
};

export const Modal = ({ onClose, isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
};