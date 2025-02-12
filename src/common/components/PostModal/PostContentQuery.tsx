import React, { Dispatch, SetStateAction } from "react";
import { postsApi, useGetPostByIdQuery, usePostDeleteMutation } from "@/service/posts/posts.service";
import { useModal } from "@/common/hooks/useModal";
import { InfoModal } from "@/common/components/Modals/InfoModal/InfoModal";
import { Button } from "@/common/components/button";
import Image from "next/image";

import styles from "./PostModal.module.scss";
import PostEdit from "@/common/components/PostModal/PostEdit/PostEdit";
import PostModalHeader from "@/common/components/PostModal/PostModalHeader";
import { SwiperSlider } from "@/common/components/Swiper/SwiperSlider";
import PostComments from "@/common/components/PostModal/PostComments";
import { PostData } from "@/types/post.types";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";


type Props = {
  data: PostData
  postId: number
  closeModal: () => void
  isPostEdit: boolean
  setIsPostEdit: Dispatch<SetStateAction<boolean>>
  openEditCloseModal: () => void
  closeEditCloseModal: () => void
  isEditModalOpen: boolean
  modalType: "view" | "edit"
  setModalType: Dispatch<SetStateAction<"view" | "edit">>
  handleCloseEditConfirmModal: () => void
}
export const PostContentQuery = ({
                                   postId,
                                   data,
                                   closeModal,
                                   isPostEdit,
                                   setIsPostEdit,
                                   handleCloseEditConfirmModal,
                                   modalType,
                                   setModalType,
                                   openEditCloseModal,
                                   closeEditCloseModal,
                                   isEditModalOpen
                                 }: Props) => {

  //const { data } = useGetPostByIdQuery({postId});

const dispatch = useAppDispatch()
  const [postDelete] = usePostDeleteMutation();



  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal
  } = useModal();

  const deletePost = () => {
    postDelete(postId )
      .unwrap()
      .then(async () => {
        await new Promise(res => setTimeout(res, 500))
        dispatch(postsApi.util.invalidateTags(["Posts"]));
        closeDeleteModal()
        closeModal()
      })
  }

  return (
    <>
      <InfoModal modalTitle={"DELETE POST"} onClose={closeDeleteModal} open={isDeleteOpen}>
        <Button onClick={deletePost}>x</Button>
      </InfoModal>


      <div className={styles.content}>
        {modalType === "view" ? (
          <>
            {data && (
              <div className={styles.modalHead}>
                <PostModalHeader
                  ownerId={data.ownerId}
                  avatarOwner={data.avatarOwner}
                  userName={data.userName}
                  setModalType={setModalType}
                  openDeleteModal={openDeleteModal}
                />
              </div>
            )}
            <div className={styles.contentTwo}>
              <div className={styles.imageContainer}>
                {data && (
                  <SwiperSlider imagesUrl={data.images} star={false} />
                )}
              </div>
              <div className={styles.commentsContainer}>
                {data && (
                  <PostComments
                    id={data.id}
                    setModalType={setModalType}
                    ownerId={data.ownerId}
                    avatarOwner={data.avatarOwner}
                    userName={data.userName}
                    description={data.description}
                    updatedAt={data.updatedAt}
                    openDeleteModal={openDeleteModal}
                  />
                )}
              </div>
            </div>
          </>
        ) : (modalType === "edit" && (
          <>
            <div className={styles.contentTwo}>
              <div>
                {data && (
                  <Image
                    src={data.images[0].url}
                    alt={"picture"}
                    priority
                    width={320}
                    height={240}
                    className={styles.singleImage}
                  />
                )}
              </div>
              <div className={styles.commentsContainer}>
                {data && (
                  <PostEdit
                    isPostEdit={isPostEdit}
                    setIsPostEdit={setIsPostEdit}
                    setModalType={setModalType}
                    ownerId={data.ownerId}
                    avatarOwner={data.avatarOwner}
                    userName={data.userName}
                    description={data.description}
                    postId={data.id}
                    closeModal={openEditCloseModal}
                    closeEditCloseModal={closeEditCloseModal}
                    handleCloseEditConfirmModal={handleCloseEditConfirmModal}
                    isEditModalOpen={isEditModalOpen}
                    openEditCloseModal={openEditCloseModal}
                    modalType={modalType}
                  />
                )}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default PostContentQuery;