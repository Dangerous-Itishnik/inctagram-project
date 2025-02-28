import { Button } from '@/common/components/button'

import styles from '@/features/profilePage/ProfileSettings/containerSettings.module.scss'

type Props = {
  openAccountManagement: () => void
  openDevices: () => void
  openGeneralInformation: () => void
  openMyPayments: () => void
}

export const ContainerSettings = ({
  openAccountManagement,
  openDevices,
  openGeneralInformation,
  openMyPayments,
}: Props) => {
  return (
    <div className={styles.settingsHeader}>
      <Button onClick={openGeneralInformation}>General information</Button>
      <Button onClick={openDevices}>Devices</Button>
      <Button onClick={openAccountManagement}>Account Management</Button>
      <Button onClick={openMyPayments}>My payments</Button>
    </div>
  )
}
