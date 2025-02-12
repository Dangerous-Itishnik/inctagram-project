import React from "react";
import { Modal } from "./Modal";
import PostContent from "./PostContent";
import { PostData } from "@/types/post.types";

type Props = {
  closeModal: ()=> void
  isOpen: boolean
  data: PostData
}
const PostContentModal = ({data, closeModal,isOpen}: Props) => {

  return (
    <Modal isOpen={isOpen}  onClose={closeModal}  >
      { data && <PostContent data={data}/>}
    </Modal>
  );
};

export default PostContentModal;