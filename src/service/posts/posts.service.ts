import { baseApi } from '@/service/baseApi'
import { PostImageResponse, PostsResponse } from '@/service/posts/post.type'

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPost: build.query<PostsResponse, { postId: number }>({
      query: body => ({
        method: 'GET',
        url: `/api/v1/posts/id/${body.postId}`,
      }),
    }),
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
  }),
})

export const { useGetPostQuery, usePostImageMutation, usePostPostMutation } = postsApi
