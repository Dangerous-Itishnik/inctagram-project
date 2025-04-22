import { Typography } from '@/common/components/Typography'
import { NotificationItem } from '@/service/notifications/notoficationsApi'

type Props = {
  newNotification: boolean
  notification: NotificationItem
}
const NotificationsItem = ({ newNotification, notification }: Props) => {
  const notifyDate = new Date(notification.createdAt)
  const today = new Date()

  notifyDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Typography style={{ color: 'gray' }} variant={'body2'}>
          Новое уведомление!
        </Typography>
        {newNotification ? <Typography style={{ color: 'red' }}>Новое</Typography> : ' '}
      </div>

      <Typography style={{ color: 'gray' }} variant={'body2'}>
        {notification.message}
      </Typography>

      <Typography style={{ color: 'gray' }} variant={'h3'}>
        {notifyDate.getTime() === today.getTime()
          ? 'Today'
          : notifyDate.toLocaleDateString('ru-RU')}
      </Typography>
    </div>
  )
}

export default NotificationsItem
