import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import { useModal } from '@/common/hooks/useModal'
import { AvatarUpload } from '@/features/profilePage/generalInformation/AvatarUpload/avatarUpload'
import { DeleteAvatar } from '@/features/profilePage/generalInformation/DeleteAvatar/deleteAvatar'
import { useGetProfileQuery } from '@/service/profile/profile.servise'
import Image from 'next/image'

import styles from './avatarPhoto.module.scss'

import DefaultImage from '../../../../public/images/DefaultImage.jpg'

type AvatarPhotoProps = {
  profileId: number
}

export const AvatarPhoto = ({ profileId }: AvatarPhotoProps) => {
  const { data } = useGetProfileQuery(profileId)
  const { closeModal, isOpen, openModal: avatarModalOpen } = useModal()

  const avatarUrl = data?.avatars?.[0]?.url

  return (
    <div className={styles.avatarComponent}>
      <div className={styles.avatarWrapper}>
        {avatarUrl ? (
          <div className={styles.imageContainer}>
            <Image
              alt={'User avatar'}
              className={styles.avatarImage}
              fill
              priority
              sizes={'33vw'}
              src={avatarUrl}
            />
            <div className={styles.delete}>
              <DeleteAvatar />
            </div>
          </div>
        ) : (
          <div className={styles.defaultAvatarContainer}>
            <Image
              alt={'Default avatar'}
              className={styles.defaultAvatar}
              height={192}
              priority
              sizes={'33vw'}
              src={DefaultImage}
              width={192}
            />
          </div>
        )}
      </div>
      <Button className={styles.button} onClick={avatarModalOpen} variant={'outline'}>
        <Typography variant={'body2'}>Add A Profile Photo</Typography>
      </Button>
      <AvatarUpload closeModal={closeModal} isOpen={isOpen} />
    </div>
  )
}
