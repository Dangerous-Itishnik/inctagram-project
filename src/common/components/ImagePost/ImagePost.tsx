import React from 'react';
import Image from "next/image"
import styles from "./ImagePost.module.scss"
 type Props={
  openModal: (postId: number)=> void
 }
export const ImagePost = ({ src, alt, postId, width, height, openModal}: Props) => {

  return (
    <>
      <div onClick={()=> openModal(postId)}>
        <Image
          className={styles.image}
          key={postId}
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority
          onLoad={() => true} // useLoader?
        />
      </div>
    </>
  );
};

export default ImagePost;