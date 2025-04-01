import { RequireAuth } from '@/common/components/requireAuth/RequireAuth'
import { GeneralInfo } from '@/features/profilePage/generalInformation/generalInfo'
import { useTranslations } from 'next-intl'

type Props = {
  params: {
    locale: string
    userId: string
  }
}

function EditProfile({ params }: Props) {
  const t = useTranslations('ProfileEdit')
  const profileId = Number(params.userId)

  if (isNaN(profileId)) {
    return <div>{t('invalidId')}</div>
  }

  return (
    <div>
      <GeneralInfo profileId={profileId} />
    </div>
  )
}

export default function EditProfileProtected(props: Props) {
  return (
    <RequireAuth>
      <EditProfile {...props} />
    </RequireAuth>
  )
}
