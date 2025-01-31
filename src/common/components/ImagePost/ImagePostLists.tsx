import React, { useEffect, useRef, useState } from "react";
import { ResponseImages, useGetPostsQuery } from "@/service/posts/posts.service";
import ImagePostList from "./ImageList";
import styles from "./ImagePost.module.css";
import { useParams } from "next/navigation";
import { posts } from "@reduxjs/toolkit/src/query/tests/mocks/handlers";



const ImagePostLists = () => {
  const { userId } = useParams<{ userId: number }>();
  const ref = useRef()
  const [postId, setPostId] = useState<number>();
  const [images, setImages] = useState<ResponseImages[]>([]);
  const { data } = useGetPostsQuery({userId, endCursorPostId: postId })

  const imagesData: ResponseImages[] = data?.items
    ? data.items.flatMap(item =>
      item.images.filter(image => image.url && typeof image.url === "string")
    )
    : [];

  useEffect(() => {
    const index = images.findIndex(image => image.id === imagesData[0]?.id)

    if (!data) {
      setImages([])
    } else if (images.length && images[0]?.id < imagesData[0]?.id) {
      setImages(imagesData)
    } else {
      setImages(prev => {
        return index === -1 ? [...prev, ...imagesData] : prev
      })
    }
  }, [data])


  return (
    <div className={styles.box}>
      <ImagePostList posts={images} />
    </div>
  );
};

export default ImagePostLists;