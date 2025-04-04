import styles from '@/features/profilePage/ProfileSettings/AccountManagement/DesktopView/CurrentSubscription/currentSubscription.module.scss'
export const CurrentSubscription = () => {
  return (
    <div className={styles.container}>
      <h3>Current Subscription:</h3>
      <div className={styles.subscription}>
        <div className={styles.expire}>
          <p>Expire at</p>
          <span>12.12.2022</span>
        </div>
        <div className={styles.nextPayment}>
          <p>Next payment</p>
          <span>12.12.2022</span>
        </div>
      </div>
      <div className={styles.renewal}>
        <input type={'checkbox'} />
        <p>Auto-Renewal</p>
      </div>
    </div>
  )
}
