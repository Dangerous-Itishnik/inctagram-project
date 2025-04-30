'use client'

import { useEffect, useState } from 'react'

import ProfileTabs from '@/common/components/Tabs/ProfileTabs'
import { useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'

type ValidTab = 'account' | 'devices' | 'general' | 'payment'

export default function EditPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState<ValidTab>('general')

  const userId = params.userId as string
  const tabParam = params.tab?.[0] as ValidTab | undefined

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam)
    } else if (!tabParam) {
      router.replace(`/profile/${userId}/edit/general`)
    }
  }, [tabParam, activeTab, userId, router])

  const handleTabChange = (tab: ValidTab) => {
    setActiveTab(tab)
    router.push(`/profile/${userId}/edit/${tab}`)
  }

  return <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />
}
