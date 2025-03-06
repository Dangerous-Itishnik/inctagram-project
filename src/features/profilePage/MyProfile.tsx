import { Button } from '@/common/components/button'
import { useMeQuery } from '@/service/auth'
import { useUserFollowQuery, useUserFollowersQuery } from '@/service/myProfile/myProfile.service'
import { Spinner } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/features/profilePage/myProfile.module.scss'

type Props = {
  openProfileSetting: () => void
}

export const MyProfile = ({ openProfileSetting }: Props) => {
  const { data: me } = useMeQuery()
  const { data: dataFollow, isLoading } = useUserFollowQuery(me?.userName)
  const { data: dataFollower } = useUserFollowersQuery(me?.userName)

  if (isLoading || !dataFollow) {
    return <Spinner />
  }

  return (
    <div className={styles.container}>
      <div className={styles.profilePhoto}>
        <Image alt={''} height={204} src={'/profileLogo.png'} width={204} />
        <h1>{me.userName}</h1>
      </div>
      <div className={styles.profileData}>
        <div className={styles.profileSettings}>
          {/*<h1>{me.userName}</h1>*/}
          <Button onClick={openProfileSetting}>Profile Settings</Button>
        </div>
        <div className={styles.profileStatistics}>
          <div className={styles.profileFollowers}>
            <span>{dataFollow?.totalCount}</span>
            <h4>Following</h4>
          </div>
          <div className={styles.profileFollowing}>
            <span>{dataFollower?.totalCount}</span>
            <h4>Followers</h4>
          </div>
          <div className={styles.profilePublications}>
            <span>2358</span>
            <h4>Publications</h4>
          </div>
        </div>
        <div className={styles.profileDescription}>
          <p>
            Some species live in houses where they a hunt insects attracted by artificial light.
            <Link href={''}> attracted by artificial light.</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
