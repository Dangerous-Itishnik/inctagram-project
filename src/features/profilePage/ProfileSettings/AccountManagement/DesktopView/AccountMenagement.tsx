import { useState } from 'react'

import { Subscription } from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/Subscription'

import styles from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/accountManagement.module.scss'

export const AccountMenagement = () => {
  const [selectedAccountType, setSelectedAccountType] = useState<'business' | 'personal'>(
    'personal'
  )

  const handleAccountTypeChange = (type: 'business' | 'personal') => {
    setSelectedAccountType(type)
  }

  return (
    <div className={styles.container}>
      <h3>Account type:</h3>
      <div className={styles.settings}>
        <div>
          <input
            checked={selectedAccountType === 'personal'}
            onChange={() => handleAccountTypeChange('personal')}
            type={'checkbox'}
          />
          <span>Personal</span>
        </div>
        <div>
          <input
            checked={selectedAccountType === 'business'}
            onChange={() => handleAccountTypeChange('business')}
            type={'checkbox'}
          />
          <span>Business</span>
        </div>
      </div>
      {selectedAccountType === 'business' && <Subscription />}
    </div>
  )
}
