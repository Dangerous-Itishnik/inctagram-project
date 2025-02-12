import React, { useEffect, useRef, useState } from "react";
import { ResponseImages, useGetPostsQuery } from "@/service/posts/posts.service";
import ImagePostList from "./ImageList";
import { useParams } from "next/navigation";
import { useModal } from "@/common/hooks/useModal";
import PostContentQueryModal from "@/common/components/PostModal/PostContentQueryModal";



const ImagePostLists = () => {

  const { userId } = useParams<{ userId: number }>();
  const [postId, setPostId] = useState<number>();
  const [images, setImages] = useState<ResponseImages[]>([]);
  const [selectedPost, setSelectedPost] = useState<>(null);
  const ref = useRef();

  const { data } = useGetPostsQuery({ userId, endCursorPostId: postId });

  const { isOpen, closeModal, openModal } = useModal();

  const imageClick = (post) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    if (selectedPost && images.length > 0) {
      openModal();
    }
  }, [selectedPost, images]);


  useEffect(() => {
    const imagesData: ResponseImages[] = data?.items
      ? data.items.flatMap(item =>
        item.images.filter(image => image.url && typeof image.url === "string").slice(0, 1)
      )
      : [];
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

      <ImagePostList posts={images} data={data?.items} openModal={imageClick} key={"list"} />

      {isOpen && <PostContentQueryModal closeModal={closeModal} isOpen={isOpen}
                                        data={selectedPost} />}
    </div>
  );
};

export default ImagePostLists;

