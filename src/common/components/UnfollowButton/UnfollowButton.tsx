import { useState } from 'react'

import Person from '@/assets/icons/components/Person'
import PersonRemove from '@/assets/icons/components/PersonRemove'
import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import { useDeleteFollowMutation, useUserFollowMutation } from '@/service/user/user.servise'

import styles from '@/features/profilePage/ProfileHeader/profileHeader.module.scss'

const UnfollowButton = ({ id }: { id: number }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>()
  const [userFollow] = useUserFollowMutation()
  const [deleteFollow] = useDeleteFollowMutation()
  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await deleteFollow(id).unwrap()
      } else {
        await userFollow({ selectedUserId: id }).unwrap()
      }
      setIsFollowing(!isFollowing)
    } catch (error) {
      console.error('Follow/unfollow error:', error)
    }
  }

  return (
    <div>
      <Button className={styles.button} onClick={toggleFollow} variant={'primary'}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {!isFollowing ? <Person /> : <PersonRemove />}
          <Typography variant={'body1'}>{!isFollowing ? 'Follow' : 'Unfollow'}</Typography>
        </div>
      </Button>
    </div>
  )
}

export default UnfollowButton
