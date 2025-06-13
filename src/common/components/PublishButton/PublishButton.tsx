import { ChangeEvent, useState } from 'react'

import { Textarea } from '@/common/components/Textarea/Textarea'
import { Button } from '@/common/components/button'
import { commentsApi, useCreateCommentMutation } from '@/service/comments/comments.servise'

import styles from './publishButton.module.scss'

const PublishButton = ({ postId }: { postId: number }) => {
  const [value, setValue] = useState<string>('')
  const [createComment] = useCreateCommentMutation()
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  const onPublish = () => {
    createComment({ content: value, postId })
      .unwrap()
      .then(() => {
        setValue('')
      })
    commentsApi.util.invalidateTags(['Comments'])
  }

  return (
    <div className={styles.publishContainer}>
      <Textarea
        label={''}
        maxLength={300}
        minLength={1}
        onChange={onChangeHandler}
        placeholder={'Add a comment...'}
        style={{ border: 'none' }}
      />
      <Button onClick={onPublish}>Publish</Button>
    </div>
  )
}

export default PublishButton
