import { baseApi } from '@/service/baseApi'

export const commentsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createAnswer: build.mutation<Comment, { commentId: number; content: string; postId: number }>({
      invalidatesTags: ['Answer'],
      query: ({ commentId, content, postId }) => ({
        body: { content },
        method: 'POST',
        url: `/api/v1/posts/${postId}/comments/${commentId}/answers`,
      }),
    }),
    createComment: build.mutation<Comment, { content: string; postId: number }>({
      invalidatesTags: ['Comments'],
      query: ({ content, postId }) => ({
        body: { content },
        method: 'POST',
        url: `api/v1/posts/${postId}/comments`,
      }),
    }),
    getAnswers: build.query<AnswersType, { commentId: number; postId: number }>({
      providesTags: ['Answer'],
      query: ({ commentId, postId }) => ({
        method: 'GET',
        url: `api/v1/posts/${postId}/comments/${commentId}/answers`,
      }),
    }),
    getComments: build.query<
      CommentsType,
      {
        pageNumber: number
        pageSize: number
        postId: number
        sortBy?: string
        sortDirection?: 'asc' | 'desc'
      }
    >({
      providesTags: ['Comments'],
      query: ({ pageNumber, pageSize, postId, sortBy, sortDirection }) => {
        const params = new URLSearchParams()

        params.append('pageSize', pageSize.toString())
        params.append('pageNumber', pageNumber.toString())

        if (sortBy) {
          params.append('sortBy', sortBy)
        }
        if (sortDirection) {
          params.append('sortDirection', sortDirection)
        }

        return {
          method: 'GET',
          params: params,
          url: `api/v1/posts/${postId}/comments`,
        }
      },
    }),

    getStatusAnswers: build.query<CommentLikesResponse, GetAnswerLikesParams>({
      providesTags: ['AnswerLikes'],
      query: ({ answerId, commentId, postId }) => ({
        method: 'GET',
        url: `/api/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
      }),
    }),
    getStatusComment: build.query<CommentLikesResponse, GetCommentLikesParams>({
      providesTags: ['Likes'],
      query: ({ commentId, postId }) => ({
        method: 'GET',
        url: `/api/v1/posts/${postId}/comments/${commentId}/likes`,
      }),
    }),

    upDateStatusAnswer: build.mutation<
      LikeResponse,
      { answerId: number; commentId: number; likeStatus: string; postId: number }
    >({
      invalidatesTags: ['AnswerLikes'],
      query: ({ answerId, commentId, likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `/api/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
      }),
    }),
    upDateStatusComment: build.mutation<
      LikeResponse,
      { commentId: number; likeStatus: string; postId: number }
    >({
      invalidatesTags: ['Likes'],
      query: ({ commentId, likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `/api/v1/posts/${postId}/comments/${commentId}/like-status`,
      }),
    }),
  }),
})

export const {
  useCreateAnswerMutation,
  useCreateCommentMutation,
  useGetAnswersQuery,
  useGetCommentsQuery,
  useGetStatusAnswersQuery,
  useGetStatusCommentQuery,
  useUpDateStatusAnswerMutation,
  useUpDateStatusCommentMutation,
} = commentsApi

export type Comment = {
  answerCount: number
  content: string
  createdAt: string
  from: {
    avatars: []
    id: number
    username: string
  }
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

type CommentsType = {
  items: Comment[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type Answer = {
  commentId: number
  content: string
  createdAt: string
  from: {
    avatars: []
    id: number
    username: string
  }
  id: number
  isLiked: boolean
  likeCount: number
}

export type AnswersType = {
  items: Answer[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}
export type LikeStatus = 'DISLIKE' | 'LIKE' | 'NONE'

type LikeResponse = {
  currentStatus: LikeStatus
  dislikesCount: number
  isLiked: boolean
  likesCount: number
}
type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
type Item = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}
type CommentLikesResponse = {
  items: Item[]
  notReadCount: number
  pageSize: number
  totalCount: number
}
type GetCommentLikesParams = {
  commentId: number
  cursor?: number
  pageNumber?: number
  pageSize?: number
  postId: number
  search?: string
}

type GetAnswerLikesParams = {
  answerId: number
  commentId: number
  cursor?: number
  pageNumber?: number
  pageSize?: number
  postId: number
  search?: string
}
