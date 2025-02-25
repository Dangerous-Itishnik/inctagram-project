import { baseApi } from '@/service/baseApi'
import { Post, PostImageResponse } from '@/service/posts/post.type'

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPost: build.query<Post, { postId: number }>({
      provideTags: ['Posts'],
      query: body => ({
        method: 'GET',
        url: `/api/v1/posts/id/${body.postId}`,
      }),
    }),
    getPublic: build.query<Post, number>({
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
      query: images => ({
        body: images,
        method: 'POST',
        url: '/api/v1/posts/image',
      }),
    }),
    postPost: build.mutation({
      query: data => ({
        body: data,
        method: 'POST',
        url: '/api/v1/posts',
      }),
    }),

    postUpdate: build.mutation<Post, { description: string; postId: number }>({
      invalidatesTags: ['posts'],
      query: ({ description, postId }) => ({
        body: { description },
        method: 'PUT',
        url: `api/v1/posts/${postId}`,
      }),
    }),
  }),
  tagTypes: ['Posts'],
})

export const {
  useGetPostQuery,
  useGetPublicQuery,
  usePostDeleteMutation,
  usePostImageMutation,
  usePostPostMutation,
  usePostUpdateMutation,
} = postsApi
