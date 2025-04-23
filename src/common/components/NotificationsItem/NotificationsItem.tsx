import { Typography } from '@/common/components/Typography'
import { formatNotificationDate } from '@/common/utils/formatNotificationDate'
import { NotificationItem } from '@/service/notifications/notoficationsApi'

type Props = {
  newNotification: boolean
  notification: NotificationItem
}
const NotificationsItem = ({ newNotification = true, notification }: Props) => {
  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Typography style={{ color: 'gray' }} variant={'body2'}>
          Новое уведомление!
        </Typography>
        {newNotification && <Typography style={{ color: 'red' }}>Новое</Typography>}
      </div>

      <Typography style={{ color: 'gray' }} variant={'body2'}>
        {notification.message}
      </Typography>

      <Typography style={{ color: 'gray' }} variant={'h3'}>
        {formatNotificationDate(notification.createdAt)}
      </Typography>
    </div>
  )
}

export default NotificationsItem
