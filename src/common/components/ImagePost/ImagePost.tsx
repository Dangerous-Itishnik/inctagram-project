import React from 'react';
import {useModal} from "../../hooks/useModal";
import Image from "next/image"
import styles from "./ImagePost.module.css"

export const ImagePost = ({src, alt, postId, width, height}) => {

  const { openModal} = useModal()
  return (
    <>
      <div onClick={
        openModal ?
          () => {
            openModal(postId)
          }
          : () => null
      }>
        <Image
          className={styles.image}
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={()=> true} // useLoader?
        />
      </div>
    </>
  );
};

export default ImagePost;