import React, { useRef } from 'react'

import { Button } from '@/common/components/button'

import styles from '@/features/profilePage/ProfileSettings/HeaderSettingsMenu/headerSettingsMenu.module.scss'

type Props = {
  openAccountManagement: () => void
  openDevices: () => void
  openGeneralInformation: () => void
  openMyPayments: () => void
}

export const HeaderSettingsMenu = React.forwardRef(
  ({ openAccountManagement, openDevices, openGeneralInformation, openMyPayments }: Props, ref) => {
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

    const handleButtonClick = (action: () => void, index: number) => {
      const button = buttonRefs.current[index]

      if (button) {
        button.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      action()
    }

    return (
      <div className={styles.settingsHeader}>
        <Button
          onClick={() => handleButtonClick(openGeneralInformation, 0)}
          ref={el => (buttonRefs.current[0] = el)}
        >
          General information
        </Button>
        <Button
          onClick={() => handleButtonClick(openDevices, 1)}
          ref={el => (buttonRefs.current[1] = el)}
        >
          Devices
        </Button>
        <Button
          onClick={() => handleButtonClick(openAccountManagement, 2)}
          ref={el => (buttonRefs.current[2] = el)}
        >
          Account Management
        </Button>
        <Button
          onClick={() => handleButtonClick(openMyPayments, 3)}
          ref={el => (buttonRefs.current[3] = el)}
        >
          My payments
        </Button>
      </div>
    )
  }
)
