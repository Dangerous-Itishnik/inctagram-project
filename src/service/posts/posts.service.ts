import { baseApi } from '@/service/baseApi'
import { Post, PostImageResponse, PostLikesResponse, PostResponse } from '@/service/posts/post.type'

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPost: build.query<Post, { postId: number }>({
      providesTags: ['Posts'],
      query: body => ({
        method: 'GET',
        url: `/api/v1/posts/id/${body.postId}`,
      }),
    }),
    getPostLikes: build.query<PostLikesResponse, number>({
      providesTags: ['PostLikes'],
      query: postId => ({
        method: 'GET',
        url: `/api/v1/posts/${postId}/likes`,
      }),
    }),
    getPostsByUserOrCursor: build.query<
      PostResponse,
      {
        pageNumber?: number
        pageSize?: number
        param: string
        sortBy?: string
        sortDirection?: 'asc' | 'desc'
      }
    >({
      query: ({
        pageNumber = 1,
        pageSize = 10,
        param,
        sortBy = 'createdAt',
        sortDirection = 'desc',
      }) => ({
        method: 'GET',
        params: {
          pageNumber,
          pageSize,
          sortBy,
          sortDirection,
        },
        url: `/api/v1/posts/${param}`,
      }),
    }),
    getPublic: build.query<Post, number>({
      providesTags: ['getPublic'], // Теперь 'getPublic' правильно указывается
      query: postId => ({
        method: 'GET',
        url: `api/v1/public-posts/${postId}`,
      }),
    }),
    postDelete: build.mutation<Post, number>({
      invalidatesTags: ['Posts'],
      query: postId => ({
        method: 'DELETE',
        url: `api/v1/posts/${postId}`,
      }),
    }),
    postImage: build.mutation<PostImageResponse, FormData>({
      invalidatesTags: ['Posts'],
      query: images => ({
        body: images,
        method: 'POST',
        url: '/api/v1/posts/image',
      }),
    }),

    postLikes: build.mutation<PostLikesResponse, { likeStatus: string; postId: number }>({
      invalidatesTags: ['PostLikes'],
      query: ({ likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `/api/v1/posts/${postId}/like-status`,
      }),
    }),

    postPost: build.mutation({
      invalidatesTags: ['Posts'],
      query: data => ({
        body: data,
        method: 'POST',
        url: '/api/v1/posts',
      }),
    }),
    postUpdate: build.mutation<Post, { description: string; postId: number }>({
      invalidatesTags: ['getPublic'],
      query: ({ description, postId }) => ({
        body: { description },
        method: 'PUT',
        url: `api/v1/posts/${postId}`,
      }),
    }),
  }),
})

export const {
  useGetPostLikesQuery,
  useGetPostQuery,
  useGetPostsByUserOrCursorQuery,
  useGetPublicQuery,
  usePostDeleteMutation,
  usePostImageMutation,
  usePostLikesMutation,
  usePostPostMutation,
  usePostUpdateMutation,
} = postsApi
