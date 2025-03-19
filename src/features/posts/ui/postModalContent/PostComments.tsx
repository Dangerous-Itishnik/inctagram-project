import { PostDescription } from '@/features/posts/ui/postModalContent/PostDescription'

type Props = {
  description: string
  userName: string
}
const PostComments = ({ description, userName }: Props) => {
  return (
    <>
      <PostDescription description={description} userName={userName} />
    </>
  )
}

export default PostComments
