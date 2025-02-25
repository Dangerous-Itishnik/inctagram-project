import { Button } from '@/common/components/button'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/features/profilePage/myProfile.module.scss'

export const MyProfile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profilePhoto}>
        <Image />
      </div>
      <div className={styles.profileData}>
        <div className={styles.profileSettings}>
          <h1>URLProfile</h1>
          <Button>Profile Settings</Button>
        </div>
        {/*данные приходят с сервера*/}
        <div className={styles.profileStatistics}>
          <div className={styles.profileFollowers}>
            <span>2218</span>
            <h4>Following</h4>
          </div>
          <div className={styles.profileFollowing}>
            <span>2358</span>
            <h4>Followers</h4>
            <div className={styles.profilePublications}>
              <span>2358</span>
              <h4>Followers</h4>
            </div>
          </div>
        </div>
        <div className={styles.profileDescription}>
          <p>
            Some species live in houses where they hunt insects attracted by artificial light. Some
            species live in houses where they hunt insects
          </p>
          <Link href={''}>attracted by artificial light.</Link>
        </div>
      </div>
    </div>
  )
}
