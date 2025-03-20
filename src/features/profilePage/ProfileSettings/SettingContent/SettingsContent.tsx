import { AccountMenagement } from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/AccountMenagement'
import { MyPayments } from '@/features/profilePage/ProfileSettings/MyPayments/MyPayments'

import styles from '@/features/profilePage/ProfileSettings/mainProfileSettings.module.scss'

type Props = {
  setStep: (step: number) => void
  step: number
}

export const SettingsContent = ({ setStep, step }: Props) => {
  const renderMyProfileSettings = () => {
    if (step === 1) {
      // return <GeneralInformation openProfileSetting={() => setStep(2)} />
    }
    if (step === 2) {
      // return <Devices openProfileSetting={() => setStep(2)} />
    }
    if (step === 3) {
      return (
        <>
          <AccountMenagement
            openAccountManagement={() => setStep(3)}
            // openDevices={() => setStep(2)}
            // openGeneralInformation={() => setStep(2)}
            // openMyPayments={() => setStep(4)}
          />
        </>
      )
    }
    if (step === 4) {
      return (
        <div className={styles.container}>
          <MyPayments
            // openAccountManagement={() => setStep(3)}
            // openDevices={() => setStep(2)}
            // openGeneralInformation={() => setStep(2)}
            openMyPayments={() => setStep(4)}
          />
        </div>
      )
    }
  }

  return <div>{renderMyProfileSettings()}</div>
}
