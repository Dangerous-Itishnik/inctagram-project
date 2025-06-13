import { useCallback, useEffect, useRef, useState } from 'react'

import { SmallAvatar } from '@/common/components/SmallAvatar/SmallAvatar'
import Answers from '@/features/posts/ui/postModalContent/Answers/Answer'
import Likes from '@/features/posts/ui/postModalContent/Likes/Likes'
import LikesCount from '@/features/posts/ui/postModalContent/Likes/LikesCount'
import { type Comment, useGetCommentsQuery } from '@/service/comments/comments.servise'
import { formatDistance } from 'date-fns'

import styles from './comments.module.scss'

import { useObserver } from '../../useObserver'

type Props = {
  postId: number
}

const Comments = ({ postId }: Props) => {
  const [activeAnswers, setActiveAnswers] = useState<{ [key: number]: boolean }>({})
  const [allComments, setAllComments] = useState<Comment[]>([])

  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState<number>(1)
  const listRef = useRef<HTMLDivElement>(null)
  const { data } = useGetCommentsQuery({
    pageNumber: page,
    pageSize: 2,
    postId,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })

  const toggleAnswers = (commentId: number) => {
    setActiveAnswers(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      setPage(prev => prev + 1)
    }
  }, [hasMore])

  useObserver(listRef, allComments, {
    onLoadMore: handleLoadMore,
    threshold: 0.1,
  })

  useEffect(() => {
    if (data) {
      if (data.page >= data.pagesCount || !data.items?.length) {
        setHasMore(false)
      }

      if (data.items?.length > 0) {
        setAllComments(prev => {
          const existingIds = new Set(prev.map(c => c.id))
          const newComments = data.items.filter(comment => !existingIds.has(comment.id))

          if (newComments.length > 0) {
            return [...prev, ...newComments]
          }

          return prev
        })
      }
    }
  }, [data])

  return (
    <div className={styles.mainComments}>
      <div ref={listRef} style={{ borderBottom: '1px solid var(--color-dark-100)' }}>
        {allComments.map((comment, index) => {
          return (
            <div key={comment.id}>
              <div className={styles.container} data-id={comment.id} data-index={index}>
                <div className={styles.userData}>
                  <SmallAvatar profileId={comment.from?.id || comment.postId} />
                </div>
                <div className={styles.subContainer}>
                  <div className={styles.content}>
                    <span style={{ fontWeight: 'bold' }}>{comment.from?.username}</span>
                    <span style={{ fontWeight: 'lighter', marginLeft: '8px' }}>
                      {comment.content}
                    </span>
                  </div>
                  <div className={styles.date}>
                    <span style={{ marginTop: '3px' }}>
                      {formatDistance(new Date(comment.createdAt), new Date(), { addSuffix: true })}
                    </span>
                    <span>
                      {comment.isLiked && <LikesCount commentId={comment.id} postId={postId} />}
                    </span>
                    <span
                      className={styles.button}
                      onClick={() => toggleAnswers(comment.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {activeAnswers[comment.id] ? 'hide answers' : 'answer'}
                    </span>
                    <Likes commentId={comment.id} isLiked={comment.isLiked} postId={postId} />
                  </div>
                </div>
              </div>
              {activeAnswers[comment.id] && (
                <div className={styles.answersWrapper}>
                  <Answers commentId={comment.id} postId={postId} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Comments
