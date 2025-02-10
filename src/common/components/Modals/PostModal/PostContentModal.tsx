import React from "react";
import { Modal } from "@/common/components/Modals/PostModal/Modal";
import PostContent from "@/common/components/Modals/PostModal/PostContent";
import { PostData, PostItem } from "@/types/post.types";

type Props = {
  closeModal: ()=> void
  isOpen: boolean
  data: PostData
}
const PostContentModal = ({ closeModal,isOpen, data}: Props) => {
  console.log(data)
  return (
    <Modal isOpen={isOpen}  onClose={closeModal}  >
      { data && <PostContent data={data}/>}
    </Modal>
  );
};

export default PostContentModal;