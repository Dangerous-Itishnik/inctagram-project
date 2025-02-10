import React, { useEffect, useRef, useState } from "react";
import { ResponseImages, useGetPostsQuery } from "@/service/posts/posts.service";
import ImagePostList from "./ImageList";
import { useParams } from "next/navigation";
import { useModal } from "@/common/hooks/useModal";
import PostContentQueryModal from "@/common/components/Modals/PostModal/PostContentQueryModal";


const ImagePostLists = () => {
  const { userId } = useParams<{ userId: number }>();
  const [postId, setPostId] = useState<number>();
  const [images, setImages] = useState<ResponseImages[]>([]);


  const { data } = useGetPostsQuery({ userId, endCursorPostId: postId });


  const { isOpen, closeModal, openModal} = useModal();

  const ref = useRef(null);


  const imagesData: ResponseImages[] = data?.items
    ? data.items.flatMap(item =>
      item.images.filter(image => image.url && typeof image.url === "string")
    )
    : [];

  useEffect(() => {
    const index = images.findIndex(image => image.id === imagesData[0]?.id);

    if (!data) {
      setImages([]);
    } else if (images.length && images[0]?.id < imagesData[0]?.id) {
      setImages(imagesData);
    } else {
      setImages(prev => {
        return index === -1 ? [...prev, ...imagesData] : prev;
      });
    }
  }, [data]);

  return (

    <div>
      <ImagePostList posts={images} openModal={openModal} key={"list"} />

      <div ref={ref} style={{ visibility: "hidden" }}>
        __________________
      </div>

      {isOpen && <PostContentQueryModal closeModal={closeModal} isOpen={isOpen} data={data} />}

    </div>
  );
};

export default ImagePostLists;

