import React from 'react';
import ImagePost from "./imagePost";

import {  ResponseImages } from "@/service/posts/posts.service";
import styles from "./ImagePost.module.scss"


type Props = {
  posts: ResponseImages[]
  openModal: (postId: number) => void;
}
const ImagePostList = ({posts,openModal}:Props) => {
  return (
    <div className={styles.box} key={"image"}>
      {posts?.map((image) => (
          <ImagePost
            key={image.uploadId}
            postId={image.id}
            src={image.url}
            alt={`Image ${image.uploadId}`}
            width={image.width as number}
            height={image.height as number}
            priority
            openModal={openModal}
          />
        ))}
    </div>
  );
};

export default ImagePostList;