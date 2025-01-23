import { baseApi } from '@/service/baseApi'

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    postImage: build.mutation({
      query: images => ({
        body: images,
        method: 'POST',
        url: '/api/v1/posts/image',
      }),
    }),
  }),
})

export const { usePostImageMutation } = postApi

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
