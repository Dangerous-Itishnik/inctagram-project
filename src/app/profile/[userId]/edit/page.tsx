import { RequireAuth } from '@/common/components/requireAuth/RequireAuth'

function EditProfile() {
  return <div>EDITING PROFILE</div>
}

export default function EditProfileProtected() {
  return (
    <RequireAuth>
      <EditProfile />
    </RequireAuth>
  )
}
