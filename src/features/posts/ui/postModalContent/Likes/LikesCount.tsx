import {
  useGetStatusAnswersQuery,
  useGetStatusCommentQuery,
} from '@/service/comments/comments.servise'

const LikesCount = ({
  answerId,
  commentId,
  postId,
}: {
  answerId?: number
  commentId: number
  postId: number
}) => {
  const { data: commentsData } = useGetStatusCommentQuery({
    commentId,
    pageNumber: 1,
    pageSize: 12,
    postId,
  })

  const { data: answersData } = useGetStatusAnswersQuery({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    answerId,
    commentId,
    pageNumber: 1,
    pageSize: 12,
    postId,
  })

  const likesCount = answerId ? answersData?.items.length : commentsData?.items.length

  return <div> Likes: {likesCount}</div>
}

export default LikesCount
