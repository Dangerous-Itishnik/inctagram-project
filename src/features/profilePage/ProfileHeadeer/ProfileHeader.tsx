import { Typography } from '@/common/components/Typography'
import { ProfileUserResponse } from '@/service/publicUsers/publicUsers.service'
import Image from 'next/image'
import Link from 'next/link'

import styles from './profileHeader.module.scss'
type Props = {
  profileUser: ProfileUserResponse
}
const ProfileHeader = ({ profileUser }: Props) => {
  const { aboutMe, avatars, userMetadata, userName } = profileUser

  return (
    <div className={styles.headerContainer}>
      <div className={styles.imageContainer}>
        {avatars.length ? (
          <Image alt={`UserPhoto`} height={204} priority src={avatars[0].url} width={204} />
        ) : (
          'Логотипа нет'
        )}
      </div>
      <div className={styles.userNameContainer}>
        <div>
          <Link href={'general-info//???'}>
            <Typography variant={'h3'}>{userName}</Typography>
          </Link>
        </div>
        <div className={styles.infoContainer}>
          <div>
            <Typography variant={'h3'}>{userMetadata.following}</Typography>
          </div>
          <div>
            <Typography variant={'h3'}>{userMetadata.followers}</Typography>
          </div>
          <div>
            <Typography variant={'h3'}>{userMetadata.publications}</Typography>
          </div>
        </div>
        <div>
          <Typography variant={'body2'}>
            {aboutMe ? aboutMe : 'Описания нет'}
            <span className={styles.spanText}>
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </span>
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
