import React from 'react';
import Image from "next/image"
import styles from "./ImagePost.module.scss"
 type Props={
  openModal?: (postId: number)=> void
 }
export const ImagePost = ({ src, alt, postId, width, height, openModal}: Props) => {
  return (
    <>
      <div onClick={openModal ? ()=>{openModal(postId)} : null}>
        <Image
          className={styles.image}
          key={postId}
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority
        />
      </div>
    </>
  );
};

export default ImagePost;