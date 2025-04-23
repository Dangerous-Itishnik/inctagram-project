import { Typography } from '@/common/components/Typography'
import { formatNotificationDate } from '@/common/utils/formatNotificationDate'
import { NotificationItem } from '@/service/notifications/notoficationsApi'

import styles from './notificationItem.module.scss'
type Props = {
  newNotification: boolean
  notification: NotificationItem
}
const NotificationsItem = ({ newNotification = true, notification }: Props) => {
  return (
    <div>
      <div className={styles.div}>
        <Typography className={styles.notif} variant={'h3'}>
          Новое уведомление!
        </Typography>
        {newNotification && <Typography style={{ color: 'red' }}>Новое</Typography>}
      </div>

      <Typography variant={'body2'}>{notification.message}</Typography>

      <Typography className={styles.time} variant={'body2'}>
        {formatNotificationDate(notification.createdAt)}
      </Typography>
    </div>
  )
}

export default NotificationsItem
