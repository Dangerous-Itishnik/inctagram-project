import React from "react";
import PostModalHeader from "@/common/components/Modals/PostModal/PostModalHeader";
import styles from "./PostModal.module.scss";
import { SwiperSlider } from "@/common/components/Swiper/SwiperSlider";
import { PostData } from "@/types/post.types";
import PostComments from "@/common/components/Modals/PostModal/PostComments";

type Props = {
  data: PostData
}
const PostContent = ({ data }: Props) => {

  return (
    <div className={styles.postContainer}>
      <div>
        {data && <PostModalHeader
          userName={data.userName}
          avatarOwner={data.avatarOwner}
          ownerId={data.ownerId}
          setModalType={() => null}
          openDelete={() => null}
          />
          }
      </div>

      <div className={styles.content}>

        <div className={styles.sliderContainer}>
          {data  && <SwiperSlider imagesUrl= {data.images} star={false} />}
        </div>

        <div className={styles.commentsContainer}>
          {data &&   <PostComments
            postId={data.id}
            setModalType={() => ({})}
            ownerId={data.ownerId}
            avatarOwner={data.avatarOwner}
            userName={data.userName}
            description={data.description}
            updatedAt={data.updatedAt}
            openDeleteModal={() => ({})}
          />}
        </div>

      </div>

    </div>
  );

};


export default PostContent;
