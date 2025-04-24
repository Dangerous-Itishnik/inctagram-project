'use client'

import { useEffect, useState } from 'react'

import { AccountManagement } from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/AccountManagement/AccountMenagement'
import { HeaderSettingsMenu } from '@/features/profilePage/ProfileSettings/HeaderSettingsMenu/HeaderSettingsMenu'
import { MyPayments } from '@/features/profilePage/ProfileSettings/MyPayments/MyPayments'
import { useParams, useRouter } from 'next/navigation'

type ValidTab = 'accountManagement' | 'devices' | 'generalInformation' | 'myPayment'

export default function ProfileTabs() {
  const params = useParams()
  const tab = params.tab as 'accountManagement' | 'devices' | 'generalInformation' | 'myPayment'
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<ValidTab>('generalInformation')

  const userId = params.userId as string
  const tabParam = params.tab?.[0] as ValidTab | undefined

  useEffect(() => {
    // if (tabParam && tabParam !== activeTab) {
    //   setActiveTab(tabParam)
    // } else if (!tabParam) {
    //   router.replace(`/profile/${userId}/settings/generalInformation`)
    // }
    if (tabParam) {
      setActiveTab(tabParam)
      router.replace(`/profile/${userId}/settings/${tab}`)
    }
  }, [tabParam, activeTab, userId, router])

  const tabChangeHandel = (tab: ValidTab) => {
    setActiveTab(tab)
    router.push(`/profile/${userId}/settings/${tab}`)
  }
  // const tabChangeHandel = (
  //   tab: 'accountManagement' | 'devices' | 'generalInformation' | 'myPayment'
  // ) => {
  //   router.push(`/profile/${userId}/settings/${tab}`)
  // }

  return (
    <div>
      <HeaderSettingsMenu activeTab={tab} onTabChange={tabChangeHandel} />
      {/*компоненты GeneralInformation и Devices не реализованы */}
      {/*{activeTab === 'generalInformation' && <GeneralInformation />}*/}
      {/*{activeTab === 'devices' && <Devices />}*/}
      {activeTab === 'accountManagement' && <AccountManagement />}
      {activeTab === 'myPayment' && <MyPayments />}
    </div>
  )
}
