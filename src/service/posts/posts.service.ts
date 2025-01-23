import { baseApi } from '@/service/baseApi'

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    postImage: build.mutation({
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
