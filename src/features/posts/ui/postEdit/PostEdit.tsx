import { useEffect, useState } from 'react'

import { Textarea } from '@/common/components/Textarea/Textarea'
import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import { postsApi, usePostUpdateMutation } from '@/service/posts/posts.service'

import styles from './PostEdit.module.scss'

type EditProps = {
  avatarOwner: string
  closeModal: () => void
  description: string
  isPostEdit: boolean
  ownerId: number
  postId: number
  setIsPostEdit: (isPostEdit: boolean) => void
  setModalType: (modalType: 'edit' | 'view') => void
  userName: string
}
export const PostEdit = ({
  description,
  isPostEdit,
  postId,
  setIsPostEdit,
  setModalType,
}: EditProps) => {
  const [postDescription, setPostDescription] = useState<string>(description || '')

  const [updatePost] = usePostUpdateMutation()

  useEffect(() => {
    setIsPostEdit(postDescription === description)
  }, [postDescription, description, setIsPostEdit])

  const updateHandle = async () => {
    try {
      await updatePost({ description: postDescription, postId }).unwrap()

      postsApi.util.invalidateTags(['Posts', 'getPublic'])

      setModalType('view')
    } catch (error) {
      console.error('Ошибка при обновлении поста:', error)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>USERNAME</header>
        <div className={styles.main}>
          <Textarea
            className={styles.description}
            errorMessage={postDescription.length > 500 ? 'error' : ' '}
            isError={postDescription.length > 500}
            label={''}
            onChange={e => {
              setPostDescription(e.target.value)
            }}
            value={postDescription}
          />

          <Typography className={styles.counter} variant={'h3'}>
            {postDescription.length / 500}
          </Typography>
        </div>
        <footer className={styles.submit}>
          <Button
            className={styles.button}
            disabled={isPostEdit || postDescription.length > 500}
            onClick={updateHandle}
            title={'SAVE'}
          >
            SAVE
          </Button>
        </footer>
      </div>
    </>
  )
}

export default PostEdit
