'use client'
import { Typography } from '@/common/components/Typography'
import UnfollowButton from '@/common/components/UnfollowButton/UnfollowButton'
import { Button } from '@/common/components/button'
import { Link, useRouter } from '@/i18n/navigation'
import { useMeQuery } from '@/service/auth'
import { ProfileUserResponse } from '@/service/publicUsers/publicUsers.service'
import { useGetUserProfileQuery } from '@/service/user/user.servise'
import Image from 'next/image'

import styles from './profileHeader.module.scss'

type Props = {
  profileUser: ProfileUserResponse
}
const ProfileHeader = ({ profileUser }: Props) => {
  const { aboutMe, avatars, id, userMetadata, userName } = profileUser
  const router = useRouter()

  const { data: currentUser } = useMeQuery()
  const { data: UserData, refetch } = useGetUserProfileQuery(userName)
  const isOwnProfile = currentUser?.userId === id
  const isAuthenticated = !!currentUser

  return (
    <div className={styles.headerContainer}>
      <div className={styles.imageContainer}>
        {avatars ? (
          <Image
            alt={`UserPhoto`}
            className={styles.avatar}
            fill
            sizes={'(max-width: 204px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            src={avatars?.[0]?.url || '/fallback.png'}
          />
        ) : (
          <div className={styles.avatar}>фото нет</div>
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.containerImageName}>
          <div className={styles.imageContainerMedia}>
            {avatars ? (
              <Image
                alt={`UserPhoto`}
                className={styles.avatar}
                fill
                sizes={'(max-width: 204px) 100vw, (max-width: 1200px) 50vw, 33vw'}
                src={avatars?.[0]?.url || '/fallback.png'}
              />
            ) : (
              <div className={styles.avatar}>фото нет</div>
            )}
          </div>
          <div className={styles.userNameContainer}>
            <Link href={`/profile/${id}`}>
              <Typography className={styles.userName} variant={'h3'}>
                {userName}
              </Typography>
            </Link>
            {isOwnProfile && (
              <Button className={styles.button} variant={'secondary'}>
                <Link href={`/profile/${id}/edit`}>
                  <Typography variant={'body1'}>Profile Settings</Typography>
                </Link>
              </Button>
            )}
            {!isOwnProfile && isAuthenticated && (
              <>
                <Button onClick={() => UserData && router.push(`/messenger/${UserData.id}`)}>
                  <Typography>Send Message</Typography>
                </Button>
                <UnfollowButton context={refetch} id={id} userName={userName} />
              </>
            )}
          </div>
        </div>
        <div>
          <div className={styles.infoContainer}>
            <div className={styles.infoItem}>
              <Typography variant={'h3'}>{UserData?.followingCount}</Typography>
              <span>Following</span>
            </div>
            <div className={styles.infoItem}>
              <Typography variant={'h3'}>{UserData?.followersCount}</Typography>
              <span>Followers</span>
            </div>
            <div className={styles.infoItem}>
              <Typography variant={'h3'}>{userMetadata?.publications}</Typography>
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
