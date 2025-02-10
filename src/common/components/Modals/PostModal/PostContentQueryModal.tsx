import React, { useState } from "react";
import PostContentQuery from "@/common/components/Modals/PostModal/PostContentQuery";
import { useModal } from "@/common/hooks/useModal";
import { Modal } from "@/common/components/Modals/PostModal/Modal";
import { PostData } from "@/types/post.types";

type Props = {
  isOpen: boolean
  closeModal: () => void
  data: PostData
}
const PostContentQueryModal = ({closeModal, isOpen, data }:
                                 Props) => {

  const [modalType, setModalType] = useState<"view" | "edit">("view");

  const [isPostEdit, setIsPostEdit] = useState(false);

  const {
    openModal: openEditCloseModal,
    closeModal: closeEditCloseModal,
    isOpen: isEditModalOpen
  } = useModal();

  const handleCloseEditConfirmModal = () => {
    setModalType("view");
    closeEditCloseModal();
  };

  return (
    <Modal isOpen={isOpen}
           title={modalType === "edit" ? "Edit post" : ""}
           onClose={modalType === "edit"
             ? !isPostEdit
               ? openEditCloseModal
               : handleCloseEditConfirmModal
             : closeModal
           }
    >
      <PostContentQuery
        data={data}
        closeModal={closeModal}
        isPostEdit={isPostEdit}
        setIsPostEdit={setIsPostEdit}
        modalType={modalType}
        setModalType={setModalType}
        handleCloseEditConfirmModal={handleCloseEditConfirmModal}
        openEditCloseModal={openEditCloseModal}
        closeEditCloseModal={closeEditCloseModal}
        isEditModalOpen={isEditModalOpen}
      />
    </Modal>
  );
};

export default PostContentQueryModal;