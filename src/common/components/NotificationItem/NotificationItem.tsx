import { Typography } from '@/common/components/Typography'

import styles from './notificationItem.module.scss'

export const NotificationItem = () => {
  return (
    <div className={styles.container}>
      {/*<h1>Уведомления</h1>*/}
      <div className={styles.title}>
        <Typography variant={'h3'}>Новые уведомления!</Typography>
        {/*{newNotification && <Typography style={{ color: 'red' }}>Новое</Typography>}*/}
      </div>
      <div className={styles.message}>
        <Typography variant={'body2'}>{'нотификашин мессадже'}</Typography>
      </div>
      <div className={styles.data}>
        <Typography variant={'body2'}>{'created at'}</Typography>
      </div>
      <div className={styles.createLine}></div>
    </div>
  )
}
