import React, { useRef } from 'react'

import { Button } from '@/common/components/button'

import styles from '@/features/profilePage/ProfileSettings/containerSettings.module.scss'

type Props = {
  openAccountManagement: () => void
  openDevices: () => void
  openGeneralInformation: () => void
  openMyPayments: () => void
}

export const ContainerSettings = React.forwardRef(
  ({ openAccountManagement, openDevices, openGeneralInformation, openMyPayments }: Props, ref) => {
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

    const handleButtonClick = (action: () => void, index: number) => {
      // Перемещаем кнопку в центр
      const button = buttonRefs.current[index]

      if (button) {
        button.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      action() // Вызываем действие
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

// export const ContainerSettings = ({
//                                       openAccountManagement,
//                                       openDevices,
//                                       openGeneralInformation,
//                                       openMyPayments,
//                                   }: Props) => {
//     return (
//         <div className={styles.settingsHeader}>
//             <Button onClick={openGeneralInformation}>General information</Button>
//             <Button onClick={openDevices}>Devices</Button>
//             <Button onClick={openAccountManagement}>Account Management</Button>
//             <Button onClick={openMyPayments}>My payments</Button>
//         </div>
//     )
// }
