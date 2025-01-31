import React from 'react';
import ImagePost from "./imagePost";
import {useModal} from "../../hooks/useModal";
import {  ResponseImages } from "@/service/posts/posts.service";
import styles from "./ImagePost.module.css"
type Props = {
  posts: ResponseImages[]
}
const ImagePostList = ({posts}:Props) => {
  const{openModal} = useModal()


  if(!posts || posts.length === 0){
    return <div>No images</div>
  }

  return (
    <div className={styles.box}>
      {posts.map((image) => (
          <ImagePost
            key={image.id}
            postId={image.id}
            src={image.url}
            alt={`Image ${image.uploadId}`}
            width={image.width}
            height={image.height}
            openModal={openModal}
          />
        ))}
    </div>
  );
};

export default ImagePostList;