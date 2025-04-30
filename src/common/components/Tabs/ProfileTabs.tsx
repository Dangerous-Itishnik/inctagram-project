import React, { useState } from 'react'

import AccountTypeSelection from '@/features/profilePage/account/AccountTypeSelection'
import Devices from '@/features/profilePage/devices/Devices'
import { GeneralInfo } from '@/features/profilePage/generalInformation/generalInfo'
import PaymentsPage from '@/features/profilePage/my-payments/MyPayments'
import { useRouter } from '@/i18n/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { useParams, usePathname } from 'next/navigation'

import styles from './tabs.module.scss'

export type TabType = 'account' | 'devices' | 'general' | 'payment'

export type ProfileTabsProps = {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab: propActiveTab, onTabChange }) => {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const id = Number(params.userId)
  const [internalActiveTab, setInternalActiveTab] = useState<TabType>(
    propActiveTab || (pathname?.split('/').pop() as TabType) || 'general'
  )

  const activeTab = propActiveTab !== undefined ? propActiveTab : internalActiveTab

  const handleValueChange = (value: string) => {
    const tab = value as TabType

    if (onTabChange) {
      onTabChange(tab)
    } else {
      setInternalActiveTab(tab)
      router.push(`/profile/${id}/edit/${tab}`)
    }
  }

  return (
    <Tabs.Root className={styles.tabsRoot} onValueChange={handleValueChange} value={activeTab}>
      <Tabs.List className={styles.tabsList}>
        {(['general', 'devices', 'account', 'payment'] as TabType[]).map(tab => (
          <Tabs.Trigger
            className={`${styles.tabsTrigger} ${activeTab === tab ? styles.activeTab : ''}`}
            key={tab}
            value={tab}
          >
            {tab === 'general' && 'General Information'}
            {tab === 'devices' && 'Devices'}
            {tab === 'account' && 'Account Management'}
            {tab === 'payment' && 'Payments'}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value={'general'}>
        <GeneralInfo profileId={id} />
      </Tabs.Content>
      <Tabs.Content value={'devices'}>
        <Devices />
      </Tabs.Content>
      <Tabs.Content value={'account'}>
        <AccountTypeSelection />
      </Tabs.Content>
      <Tabs.Content value={'payment'}>
        <PaymentsPage />
      </Tabs.Content>
    </Tabs.Root>
  )
}

export default ProfileTabs
