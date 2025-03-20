import { useState } from 'react'

import { HeaderSettingsMenu } from '@/features/profilePage/ProfileSettings/HeaderSettingsMenu/HeaderSettingsMenu'
import { SettingsContent } from '@/features/profilePage/ProfileSettings/SettingContent/SettingsContent'

import styles from '@/features/profilePage/ProfileSettings/mainProfileSettings.module.scss'

export const MainProfileSettings = () => {
  const [step, setStep] = useState<number>(1)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderSettingsMenu
          openAccountManagement={() => setStep(3)}
          openMyPayments={() => setStep(4)}
        />
      </div>
      <div className={styles.content}>
        <SettingsContent setStep={setStep} step={step} />
      </div>
    </div>
  )
}
