import { Button } from '@/common/components/button'
import { myProfileApi } from '@/service/myProfile/myProfile.service'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/features/profilePage/myProfile.module.scss'

type Props = {
  openProfileSetting: () => void
}

export const MyProfile = ({ openProfileSetting }: Props) => {
  const { data } = myProfileApi('adsasdasd')

  console.log(data)

  return (
    <div className={styles.container}>
      <div className={styles.profilePhoto}>
        <Image alt={''} height={204} src={'/profileLogo.png'} width={204} />
      </div>
      <div className={styles.profileData}>
        <div className={styles.profileSettings}>
          <h1>URLProfile</h1>
          <Button onClick={openProfileSetting}>Profile Settings</Button>
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
          </div>
          <div className={styles.profilePublications}>
            <span>2358</span>
            <h4>Followers</h4>
          </div>
        </div>
        <div className={styles.profileDescription}>
          <p>
            Some species live in houses where they hunt insects attracted by artificial light. Some
            species live in houses where they hunt insects
            <Link href={''}> attracted by artificial light.</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
