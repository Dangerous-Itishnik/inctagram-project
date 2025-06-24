'use client'
import Person from '@/assets/icons/components/Person'
import PersonRemove from '@/assets/icons/components/PersonRemove'
import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import {
  useDeleteFollowMutation,
  useGetUserProfileQuery,
  useUserFollowMutation,
} from '@/service/user/user.servise'

import styles from './unbutton.module.scss'

const UnfollowButton = ({
  context,
  id,
  userName,
}: {
  context?: () => void
  id: number
  userName: string
}) => {
  const { data: userProfileData } = useGetUserProfileQuery(userName, {
    skip: !userName,
  })
  const [userFollow] = useUserFollowMutation()
  const [deleteFollow] = useDeleteFollowMutation()

  const isFollowing = userProfileData?.isFollowing ?? false

  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await deleteFollow(id).unwrap()
      } else {
        await userFollow({ selectedUserId: id }).unwrap()
      }
      context?.()
    } catch (error) {
      console.error('Follow/unfollow error:', error)
    }
  }

  return (
    <Button onClick={toggleFollow} variant={'link'}>
      <div className={styles.button}>
        {!isFollowing ? <Person /> : <PersonRemove />}
        <Typography className={styles.text}>{!isFollowing ? 'Follow' : 'Unfollow'}</Typography>
      </div>
    </Button>
  )
}

export default UnfollowButton
