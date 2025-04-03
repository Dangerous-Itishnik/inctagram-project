import { useGetProfileQuery } from '@/service/profile/profile.servise'
import Image from 'next/image'
type Props = {
  profileId: number
}
export const SmallAvatar = ({ profileId }: Props) => {
  const { data } = useGetProfileQuery(profileId)
  const avatarURL = data?.avatars[0].url || ''

  return (
    <div>
      <Image
        alt={'avatar'}
        height={36}
        priority
        sizes={'22vw'}
        src={avatarURL!}
        style={{ borderRadius: '50%' }}
        width={36}
      />
    </div>
  )
}

export default SmallAvatar
