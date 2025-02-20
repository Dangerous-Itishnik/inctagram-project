import React, { useEffect, useState } from "react";
import { Button } from "@/common/components/button";
import { Textarea } from "@/common/components/Textarea/Textarea";
import { Typography } from "@/common/components/Typography";
import { postsApi, usePostUpdateMutation } from "@/service/posts/posts.service";
import { useAppDispatch } from "@/service/store";
import styles from "./PostEdit.module.scss";

type EditProps = {
  postId: number
  ownerId: number
  avatarOwner: string
  userName: string
  description: string
  setModalType: (modalType: "edit" | "view") => void
  closeModal: () => void
  isPostEdit: boolean
  setIsPostEdit: (isPostEdit: boolean) => void
}
const PostEdit = ({
                    postId,
                    description,
                    isPostEdit,
                    setIsPostEdit,
                    setModalType
                  }: EditProps) => {

    const [postDescription, setPostDescription] = useState<string>(description || "");

    const [updatePost] = usePostUpdateMutation();

    const dispatch = useAppDispatch();


    useEffect(() => {
      setIsPostEdit(postDescription === description);
    }, [postDescription, description]);

    const updateHandle = () => {
      updatePost({ description: postDescription, postId })
        .unwrap()
        .then(() => {
          dispatch(postsApi.util.invalidateTags(["Posts"]));
          setModalType("view");
        });
    };

    return (
      <>
        <div className={styles.container}>
          <header className={styles.header}>
            USERNAME
          </header>
          <div className={styles.main}>
            <Textarea
              className={styles.description}
              label={""}
              value={postDescription}
              onChange={e => {
                setPostDescription(e.target.value);
              }}
              isError={postDescription.length > 500}
              errorMessage={postDescription.length > 500 ? "error" : " "}
            />

            <Typography variant={"h3"} className={styles.counter}>
              {postDescription.length / 500}
            </Typography>
          </div>
          <footer className={styles.submit}>
            <Button
              title={"SAVE"}
              onClick={updateHandle}
              disabled={isPostEdit || postDescription.length > 500}
              className={styles.button}
            >SAVE</Button>
          </footer>
        </div>
      </>
    );
  }
;

export default PostEdit;