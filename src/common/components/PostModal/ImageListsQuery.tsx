/* eslint-disable react-hooks/exhaustive-deps */
import { useRef} from 'react'

import { usePathname, useRouter, useSearchParams } from "next/navigation";


import styles from './ImagePost.module.scss'

import ImagePostList from "@/common/components/ImagePost/ImageList";
import { ResponseImages } from "@/service/posts/posts.service";
import PostContentModal from "@/common/components/Modals/PostModal/PostContentModal";
import { PostData } from "@/types/post.types";

type Props={
  posts: ResponseImages[]
  data: PostData
}


export const ImageListsQuery = ({data,posts, openModal}) => {
  const ref = useRef(null)
  const router = useRouter()
  const pathname = usePathname(); // Get the current pathname
  const searchParams = useSearchParams();
// Get query parameters
  const postId = searchParams.get('postId');
  const ownerId = searchParams.get('ownerId');

  const handleCloseModal = () => {
    let newPathname: string;

    if (pathname.includes('postId')) {
      // Replace [postId] and [ownerId] dynamically
      newPathname = pathname
        .replace('[postId]', '')
        .replace('[ownerId]', ownerId || '');
    } else {
      // Use the current path without query parameters
      newPathname = pathname;
    }

    // Create a new URLSearchParams object for the query
    const newSearchParams = new URLSearchParams();
    if (postId) {
      newSearchParams.set('postId', postId);
    }

    // Construct the new URL
    const newUrl = `${newPathname}?${newSearchParams.toString()}`;

    // Navigate to the new URL
    router.push(newUrl, { scroll: false });
  };


  return (

        <>
          <div >
            <ImagePostList posts={posts} openModal={() => {}} className={styles.list}/>
          </div>
          <div ref={ref} style={{ visibility: 'hidden' }}>
            __________________
          </div>
          <div >
             //<PostContentModal closeModal={handleCloseModal} isOpen data={data}/>
          </div>
        </>
  )
}