import { Checkbox } from '@/common/components/CheckBox'

import styles from '@/features/profilePage/ProfileSettings/AccountManagement/accountTypeSettings.module.scss'

export const AccountTypeSettings = () => {
  return (
    <div className={styles.container}>
      <h3>Account type:</h3>
      <div className={styles.settings}>
        <div>
          <Checkbox />
          <span>Personal</span>
        </div>
        <div>
          <Checkbox />
          <span>Business</span>
        </div>
      </div>
    </div>
  )
}
