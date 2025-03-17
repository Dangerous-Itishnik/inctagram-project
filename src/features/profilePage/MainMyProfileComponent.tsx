import { useState } from 'react'

import { MyProfile } from '@/features/profilePage/MyProfile'
import { AccountTypeSettings } from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/AccountTypeSettings'
import { ContainerSettings } from '@/features/profilePage/ProfileSettings/ContainerSettings'
import { MyPaymentsMobile } from '@/features/profilePage/ProfileSettings/MyPayments/MobileView/MyPaymentsMobile'
import { MyPayments } from '@/features/profilePage/ProfileSettings/MyPayments/MyPayments'

export const MainMyProfileComponent = () => {
  const [step, setStep] = useState<number>(1)

  const renderMyProfileSettings = () => {
    if (step === 1) {
      return <MyProfile openProfileSetting={() => setStep(2)} />
    }
    if (step === 2) {
      return (
        <ContainerSettings
          openAccountManagement={() => setStep(3)}
          openDevices={() => setStep(2)}
          openGeneralInformation={() => setStep(2)}
          openMyPayments={() => setStep(4)}
        />
      )
    }
    if (step === 3) {
      return (
        <>
          <ContainerSettings
            openAccountManagement={() => setStep(3)}
            openDevices={() => setStep(2)}
            openGeneralInformation={() => setStep(2)}
            openMyPayments={() => setStep(4)}
          />
          <AccountTypeSettings />
        </>
      )
    }
    if (step === 4) {
      return (
        <>
          <ContainerSettings
            openAccountManagement={() => setStep(3)}
            openDevices={() => setStep(2)}
            openGeneralInformation={() => setStep(2)}
            openMyPayments={() => setStep(4)}
          />
          {/*<MyPayments />*/}
          <MyPaymentsMobile />
        </>
      )
    }
  }

  return <div>{renderMyProfileSettings()}</div>
}
