import { baseApi } from "@/service/baseApi";
import { PostItem } from "@/types/post.types";
import { number } from "prop-types";


export const postsApi = baseApi.injectEndpoints({
  reducerPath: "postApi",
  tagTypes: ["Posts", "Post"],
  endpoints: build => {
    return ({
      getPosts: build.query<PostsAllData, { userId, endCursorPostId }>({
        providesTags: ["Posts"],
        query: ({ userId, endCursorPostId }) => ({
          method: "GET",
          url: `api/v1/public-posts/user/${userId}/${endCursorPostId || ""}?pageSize=8`
        })
      }),

      postUpdate: build.mutation<PostItem, { description }>({
        query: ({ postId, description }) => ({
          method: "PUT",
          body: { description },
          url: `api/v1/posts/${postId}`
        }),
        invalidatesTags: ["Posts"]
      }),

      postDelete: build.mutation<never, number>({
        query: postId=> ({
          method: "DELETE",
          url: `api/v1/posts/${postId}`,
          param: {id: postId}
        }),
        invalidatesTags: ["Posts"]
      }),

      postImage: build.mutation<Response, FormData>({
        query: images => ({
          body: images,
          method: "POST",
          url: "/api/v1/posts/image"
        }),
        invalidatesTags: ["Posts"]
      }),
      postPost: build.mutation({
        query: data => ({
          body: data,
          method: "POST",
          url: "/api/v1/posts"
        }),
        invalidatesTags: ["Posts"]
      }),

      getPostById: build.query<PostData, void>({
        query: (postId) =>({
         url: `/api/v1/posts/${postId}`,
          method: "GET",
          param: {id: postId}
        }),
        providesTags: ["Post"]
      }),
    });
  }
});


export const {
  usePostImageMutation,
  usePostPostMutation,
  useGetPostsQuery,
  usePostUpdateMutation,
  usePostDeleteMutation,
  useGetPostByIdQuery
} = postsApi;

export type Response = {
  images: ResponseImages[]
  description?: string
}
export type ResponseImages = {
  id: number
  createdAt?: string
  fileSize?: number
  height?: number
  uploadId: number
  url: string
  width?: number
}


export type PostItem = {
  id: number,
  ownerId: number,
  userName: string,
  description: string,
  location: string,
  images: ResponseImages[],
  createdAt: string,
  updatedAt: string,
  avatarOwner: string,
  owner: {
    firstName: string,
    lastName: string,
  }
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}
export type PostsAllData = {
  totalCount: number,
  pageSize: number,
  items: PostItem[],
  totalUsers: number
}

type Owner = {
  firstName: string
  lastName: string
}

type PostData = {
  id: number
  ownerId: number
  userName: string
  description: string
  images: ResponseImages[]
  owner: Owner
  avatarOwner: string
  updatedAt: string
  createdAt: string
}

export const transformPostData = (el: PostData): PostData => {
  return {
    id: el.id,
    ownerId: el.ownerId,
    description: el.description,
    images: el.images,
    owner: el.owner,
    avatarOwner: el.avatarOwner,
    updatedAt: el.updatedAt,
    userName: el.userName,
    createdAt: el.createdAt
  };
};