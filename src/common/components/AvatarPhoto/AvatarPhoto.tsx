import { Button } from '@/common/components/button'
import { useModal } from '@/common/hooks/useModal'
import { AvatarUpload } from '@/features/profilePage/generalInformation/AvatarUpload/avatarUpload'
import { useGetProfileQuery } from '@/service/profile/profile.servise'
import Image from 'next/image'

import styles from './avatarPhoto.module.scss'

import DefaultImage from '../../../../public/images/DefaultImage.jpg'

type AvatarPhotoProps = {
  profileId: number
}

export const AvatarPhoto = ({ profileId }: AvatarPhotoProps) => {
  const { data } = useGetProfileQuery(profileId)
  const { closeModal, isOpen, openModal } = useModal()

  const avatarUrl = data?.avatars?.[0]?.url

  return (
    <div>
      <div className={styles.imageContainer}>
        {avatarUrl ? (
          <Image
            alt={'User avatar'}
            className={styles.avatarImage}
            fill
            priority
            sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            src={avatarUrl}
          />
        ) : (
          <Image
            alt={'Default avatar'}
            height={192}
            src={DefaultImage}
            style={{ borderRadius: '50%' }}
            width={192}
          />
        )}
      </div>

      <Button className={styles.button} onClick={openModal} variant={'outline'}>
        Add A Profile Photo
      </Button>

      <AvatarUpload closeModal={closeModal} isOpen={isOpen} />
    </div>
  )
}

export default AvatarPhoto
