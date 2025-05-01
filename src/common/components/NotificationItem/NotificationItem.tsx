import { Typography } from '@/common/components/Typography'
import { NotificationItemType } from '@/service/notifications/notifications.service'

import styles from './notificationItem.module.scss'

type Props = {
  notification: NotificationItemType
}

export const NotificationItem = ({ notification }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Typography variant={'h3'}>Новые уведомления!</Typography>
        {/*{newNotification && <Typography style={{ color: 'red' }}>Новое</Typography>}*/}
      </div>
      <div className={styles.message}>
        <Typography variant={'body2'}>{notification.message}</Typography>
      </div>
      <div className={styles.data}>
        <Typography variant={'body2'}>{notification.createdAt}</Typography>
      </div>
      <div className={styles.createLine}></div>
    </div>
  )
}
