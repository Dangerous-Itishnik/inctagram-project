import { Button } from '@/common/components/button'

import styles from '@/features/profilePage/ProfileSettings/containerSettings.module.scss'

export const ContainerSettings = () => {
  return (
    <div className={styles.settingsHeader}>
      <Button>General information</Button>
      <Button>Devices</Button>
      <Button>Account Management</Button>
      <Button>My payments</Button>
    </div>
  )
}
