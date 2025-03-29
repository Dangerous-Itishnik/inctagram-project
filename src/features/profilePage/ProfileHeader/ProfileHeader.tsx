'use client'
import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import { ProfileUserResponse } from '@/service/publicUsers/publicUsers.service'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from './profileHeader.module.scss'

type Props = {
  profileUser: ProfileUserResponse
}
const ProfileHeader = ({ profileUser }: Props) => {
  const { aboutMe, avatars, id, userMetadata, userName } = profileUser
  const router = useRouter()

  return (
    <div className={styles.headerContainer}>
      <div className={styles.imageContainer}>
        {avatars.length ? (
          <Image
            alt={`UserPhoto`}
            className={styles.avatar}
            fill
            priority
            src={avatars.length ? avatars[0].url : ''}
          />
        ) : (
          <div className={styles.avatar}>фото нет</div>
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.containerImageName}>
          <div className={styles.imageContainerMedia}>
            {avatars.length ? (
              <Image
                alt={`UserPhoto`}
                className={styles.avatar}
                fill
                priority
                src={avatars.length ? avatars[0].url : ''}
              />
            ) : (
              <div className={styles.avatar}>фото нет</div>
            )}
          </div>
          <div className={styles.userNameContainer}>
            <Link href={'general-info//???'}>
              <Typography className={styles.userName} variant={'h3'}>
                {userName}
              </Typography>
            </Link>
            <Button
              className={styles.button}
              onClick={() => router.push(`/profile/${id}/edit`)}
              variant={'secondary'}
            >
              <Typography variant={'body1'}>Profile Settings</Typography>
            </Button>
          </div>
        </div>
        <div>
          <div className={styles.infoContainer}>
            <div className={styles.infoItem}>
              <Typography variant={'h3'}>{userMetadata.following}</Typography>
              <span>Following</span>
            </div>
            <div className={styles.infoItem}>
              <Typography variant={'h3'}>{userMetadata.followers}</Typography>
              <span>Followers</span>
            </div>
            <div className={styles.infoItem}>
              <Typography variant={'h3'}>{userMetadata.publications}</Typography>
              <span>Publications</span>
            </div>
          </div>

          <Typography className={styles.displayNoneMobile} variant={'body2'}>
            {aboutMe ? aboutMe : 'Описания нет'}
          </Typography>
        </div>
      </div>
      <Typography className={styles.displayNoneDesktop} variant={'body2'}>
        {aboutMe ? aboutMe : 'Описания нет'}
      </Typography>
    </div>
  )
}

export default ProfileHeader
