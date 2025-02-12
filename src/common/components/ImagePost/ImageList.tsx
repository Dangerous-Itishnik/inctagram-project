import React from 'react';
import ImagePost from "./imagePost";
import {  ResponseImages } from "@/service/posts/posts.service";
import styles from "./ImagePost.module.scss"
import { PostData } from "@/types/post.types";

type Props = {
  posts: ResponseImages[];
  openModal?: (post: PostData) => void;
  data: PostData[];
};

const ImagePostList = ({ posts, openModal, data }: Props) => {
  return (
    <div className={styles.box}>
      {posts?.map((image) => {
        const post = data?.find((item) =>
          item.images.some((img) => img.uploadId === image.uploadId)
        );
        return (
          <ImagePost
            key={image.uploadId}
            postId={post} // Passing the actual post object here
            src={image.url}
            alt={`Image ${image.uploadId}`}
            width={image.width as number}
            height={image.height as number}
            priority
            openModal={openModal ? () => openModal(post) : undefined}
          />
        );
      })}
    </div>
  );
};


export default ImagePostList;