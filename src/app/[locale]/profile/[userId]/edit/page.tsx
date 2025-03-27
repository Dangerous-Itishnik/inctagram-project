import { RequireAuth } from '@/common/components/requireAuth/RequireAuth'
import { GeneralInfo } from '@/features/profilePage/generalInformation/generalInfo'

type Props = {
  params: {
    userId: string // Next.js params are always strings
  }
}

function EditProfile({ params }: Props) {
  const profileId = Number(params.userId)

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
