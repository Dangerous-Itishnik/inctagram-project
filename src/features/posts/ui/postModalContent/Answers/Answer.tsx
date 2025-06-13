import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

import { Input } from '@/common/components/Input'
import { SmallAvatar } from '@/common/components/SmallAvatar/SmallAvatar'
import { Button } from '@/common/components/button'
import LikesCount from '@/features/posts/ui/postModalContent/Likes/LikesCount'
import {
  type Answer,
  useCreateAnswerMutation,
  useGetAnswersQuery,
} from '@/service/comments/comments.servise'
import { formatDistance } from 'date-fns'

import styles from '@/features/posts/ui/postModalContent/Answers/answers.module.scss'

import { useObserver } from '../../useObserver'
import AnswerLike from '../Likes/AnswersLike'

type Props = {
  commentId: number
  postId: number
}

const Answers = ({ commentId, postId }: Props) => {
  const [value, setValue] = useState<string>('')
  const [hasMore, setHasMore] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPage] = useState<number>(1)
  const [allAnswers, setAllAnswers] = useState<Answer[]>([])
  const listRef = useRef<HTMLDivElement>(null)

  const { data } = useGetAnswersQuery({
    commentId,
    postId,
  })
  const [createAnswer] = useCreateAnswerMutation()
  const handleLoadMoreAnswers = useCallback(() => {
    if (hasMore) {
      setPage(prev => prev + 1)
    }
  }, [hasMore])

  useObserver(listRef, allAnswers, {
    onLoadMore: handleLoadMoreAnswers,
    threshold: 0.5,
  })

  useEffect(() => {
    if (data) {
      if (data.page >= data.pagesCount || !data.items?.length) {
        setHasMore(false)
      }

      if (data.items?.length > 0) {
        setAllAnswers(prev => {
          const existingIds = new Set(prev.map(a => a.id))
          const newAnswers = data.items.filter(answer => !existingIds.has(answer.id))

          if (newAnswers.length > 0) {
            return [...prev, ...newAnswers]
          }

          return prev
        })
      }
    }
  }, [data])

  const onAnswer = async () => {
    const trimmed = value.trim()

    if (!trimmed) {
      return
    }

    try {
      await createAnswer({
        commentId: Number(commentId),
        content: trimmed,
        postId: Number(postId),
      }).unwrap()
      setValue('')
      setPage(1)
      setAllAnswers([])
      setHasMore(true)
    } catch (error) {
      console.error('Failed to post answer:', error)
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className={styles.answersContainer}>
      <div className={styles.answersScroll} ref={listRef}>
        {allAnswers.map(answer => (
          <div className={styles.answerItem} key={answer.id}>
            <div className={styles.userData}>
              <SmallAvatar profileId={answer.from?.id || answer.commentId} />
            </div>
            <div className={styles.subContainer}>
              <div className={styles.content}>
                <span style={{ fontWeight: 'bold' }}>{answer.from?.username}</span>
                <span style={{ fontWeight: 'lighter', marginLeft: '8px' }}>{answer.content}</span>
              </div>
              <div className={styles.date}>
                <span
                  style={{ color: 'var(--color-light-900)', fontSize: '12px', marginTop: '3px' }}
                >
                  {formatDistance(new Date(answer.createdAt), new Date(), { addSuffix: true })}
                </span>
                <span>
                  {answer.isLiked && (
                    <LikesCount answerId={answer.id} commentId={commentId} postId={postId} />
                  )}
                </span>
                <AnswerLike
                  answerId={answer.id}
                  commentId={commentId}
                  isLiked={answer.isLiked}
                  postId={postId}
                />
              </div>
            </div>
          </div>
        ))}
        {hasMore && allAnswers.length > 0 && (
          <div
            style={{
              color: 'var(--color-light-900)',
              fontSize: '12px',
              padding: '8px',
              textAlign: 'center',
            }}
          >
            Loading more answers...
          </div>
        )}
      </div>

      <div className={styles.answerInput}>
        <div style={{ flex: 1 }}>
          <Input
            label={''}
            onChange={onChangeHandler}
            placeholder={'Add an answer...'}
            type={'text'}
            value={value}
          />
        </div>
        <Button disabled={!value.trim()} onClick={onAnswer}>
          Reply
        </Button>
      </div>
    </div>
  )
}

export default Answers
