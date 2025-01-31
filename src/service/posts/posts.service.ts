import { baseApi } from "@/service/baseApi";


export const postsApi = baseApi.injectEndpoints({
  tagTypes: ['Posts'],
  endpoints: build => {
    return ({
      getPosts: build.query<PostsAllData, { userId, endCursorPostId}>({
        providesTags: ['Posts'],
        query: ({ userId, endCursorPostId }) => ({
          method: "GET",
          url: `api/v1/public-posts/user/${userId}/${endCursorPostId || ''}?pageSize=8`,
        }),
      }),

      postImage: build.mutation<Response, FormData>({
        query: images => ({
          body: images,
          method: "POST",
          url: "/api/v1/posts/image"
        })
      }),
      postPost: build.mutation({
        query: data => ({
          body: data,
          method: "POST",
          url: "/api/v1/posts"
        })
      })
    });
  }
});


// deletePost: build.mutation<
//   any,
//   {
//     accessToken: string | undefined
//     postId: number
//   }
// >({
//   query: ({ accessToken, postId }) => ({
//     method: 'DELETE',
//     url: `/posts/${postId}`,
//   }),
// }),

// updatePost: build.mutation<
//   { description: 'string' },
//   {
//     accessToken: string | undefined
//     description: string
//     postId: number
//   }
// >({
//   //TODO для того что бы обновить посты и отрисовать
//   // invalidatesTags: ['Posts'],
//   query: ({ accessToken, description, postId }) => ({
//     body: { description },
//     method: 'PUT',
//     url: `/posts/${postId}`,
//   }),
// }),


export const { usePostImageMutation, usePostPostMutation, useGetPostsQuery } = postsApi;

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
}
export type PostsAllData = {
  totalCount: number,
  pageSize: number,
  items: PostItem[],
  totalUsers: number
}


