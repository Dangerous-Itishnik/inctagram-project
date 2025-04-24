'use client'

import { useEffect, useState } from 'react'

import { HeaderSettingsMenu } from '@/features/profilePage/ProfileSettings/HeaderSettingsMenu/HeaderSettingsMenu'
import { useParams, useRouter } from 'next/navigation'

type ValidTab = 'accountManagement' | 'devices' | 'generalInformation' | 'myPayment'

export default function SettingsPage() {
  //убрать дубликаты состояния activeTab и функцию tabChangeHandel из ProfileTabs через useContext

  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<ValidTab>('generalInformation')

  const userId = params.userId as string
  const tabParam = params.tab?.[0] as ValidTab | undefined

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam)
    } else if (!tabParam) {
      router.replace(`/profile/${userId}/settings/generalInformation`)
    }
  }, [tabParam, activeTab, userId, router])

  const tabChangeHandel = (tab: ValidTab) => {
    setActiveTab(tab)
    router.push(`/profile/${userId}/settings/${tab}`)
  }

  return (
    <div>
      <HeaderSettingsMenu activeTab={activeTab} onTabChange={tabChangeHandel} />
    </div>
  )
}
