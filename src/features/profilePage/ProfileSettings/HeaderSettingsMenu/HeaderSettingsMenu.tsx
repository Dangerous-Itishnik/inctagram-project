import React, { useRef, useState } from 'react'

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
    const [activeButton, setActiveButton] = useState<null | number>(0)

    const handleButtonClick = (action: () => void, index: number) => {
      const button = buttonRefs.current[index]

      if (button) {
        button.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      setActiveButton(index)
      action()
    }

    return (
      <div className={styles.settingsHeader}>
        <Button
          className={activeButton === 0 ? styles.active : ''}
          onClick={() => handleButtonClick(openGeneralInformation, 0)}
          ref={el => (buttonRefs.current[0] = el)}
        >
          General information
        </Button>

        <Button
          className={activeButton === 1 ? styles.active : ''}
          onClick={() => handleButtonClick(openDevices, 1)}
          ref={el => (buttonRefs.current[1] = el)}
        >
          Devices
        </Button>

        <Button
          className={activeButton === 2 ? styles.active : ''}
          onClick={() => handleButtonClick(openAccountManagement, 2)}
          ref={el => (buttonRefs.current[2] = el)}
        >
          Account Management
        </Button>

        <Button
          className={activeButton === 3 ? styles.active : ''}
          onClick={() => handleButtonClick(openMyPayments, 3)}
          ref={el => (buttonRefs.current[3] = el)}
        >
          My payments
        </Button>
      </div>
      // <div className={styles.settingsHeader}>
      //   <Link href={`/profile/${data?.userId}/settings/generalInformation`}>
      //     <Button
      //       className={activeButton === 0 ? styles.active : ''}
      //       onClick={() => handleButtonClick(openGeneralInformation, 0)}
      //       ref={el => (buttonRefs.current[0] = el)}
      //     >
      //       General information
      //     </Button>
      //   </Link>
      //
      //   <Link href={`/profile/${data?.userId}/settings/devices`}>
      //     <Button
      //       className={activeButton === 1 ? styles.active : ''}
      //       onClick={() => handleButtonClick(openDevices, 1)}
      //       ref={el => (buttonRefs.current[1] = el)}
      //     >
      //       Devices
      //     </Button>
      //   </Link>
      //
      //   <Link href={`/profile/${data?.userId}/settings/accountManagement`}>
      //     <Button
      //       className={activeButton === 2 ? styles.active : ''}
      //       onClick={() => handleButtonClick(openAccountManagement, 2)}
      //       ref={el => (buttonRefs.current[2] = el)}
      //     >
      //       Account Management
      //     </Button>
      //   </Link>
      //
      //   <Link href={`/profile/${data?.userId}/settings/myPayments`}>
      //     <Button
      //       className={activeButton === 3 ? styles.active : ''}
      //       onClick={() => handleButtonClick(openMyPayments, 3)}
      //       ref={el => (buttonRefs.current[3] = el)}
      //     >
      //       My payments
      //     </Button>
      //   </Link>
      // </div>
    )
  }
)
