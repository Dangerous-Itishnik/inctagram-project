'use client'

import ProfileTabs from '@/common/components/Tabs/ProfileTabs'
import { useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
export default function EditTabPage() {
  const params = useParams()
  const tab = params.tab as 'account' | 'devices' | 'general' | 'payment'
  const id = Number(params.userId)
  const router = useRouter()

  const handleTabChange = (tab: 'account' | 'devices' | 'general' | 'payment') => {
    router.push(`/profile/${id}/edit/${tab}`)
  }

  return <ProfileTabs activeTab={tab} onTabChange={handleTabChange} />
}
