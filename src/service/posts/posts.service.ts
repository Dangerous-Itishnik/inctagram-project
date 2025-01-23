import { baseApi } from '@/service/baseApi'

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    deletePost: build.mutation<
      any,
      {
        accessToken: string | undefined
        postId: number
      }
    >({
      query: ({ accessToken, postId }) => ({
        method: 'DELETE',
        url: `/posts/${postId}`,
      }),
    }),
    postImage: build.mutation<Response, FormData>({
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
    updatePost: build.mutation<
      { description: 'string' },
      {
        accessToken: string | undefined
        description: string
        postId: number
      }
    >({
      //TODO для того что бы обновить посты и отрисовать
      // invalidatesTags: ['Posts'],
      query: ({ accessToken, description, postId }) => ({
        body: { description },
        method: 'PUT',
        url: `/posts/${postId}`,
      }),
    }),
  }),
})

export const { usePostImageMutation, usePostPostMutation } = postsApi

export type Response = {
  images: ResponseImages[]
}
export type ResponseImages = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
