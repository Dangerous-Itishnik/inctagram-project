import { useEffect, useRef, useState } from 'react'

import { FillBell } from '@/assets/icons/components'
import NotificationsItem from '@/common/components/NotificationsItem/NotificationsItem'
import { Button } from '@/common/components/button'
import { useObserver } from '@/common/hooks/useObserver'
import {
  NotificationItem,
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from '@/service/notifications/notoficationsApi'
import { SocketApi } from '@/socket/useSocket'

import styles from './notification.module.scss'

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [realTimeNotifications, setRealTimeNotifications] = useState<NotificationItem[]>([])
  const { data } = useGetNotificationsQuery()
  const [markAsRead] = useMarkAsReadMutation()
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!SocketApi.socket) {
      return
    }
    const handleNotification = (notifMessage: NotificationItem) => {
      setRealTimeNotifications(prev => {
        const alreadyExists = prev.some(item => item.id === notifMessage.id)

        if (alreadyExists) {
          return prev
        }

        return [notifMessage, ...prev]
      })
    }

    SocketApi.socket.on('notifications', handleNotification)
  }, [])

  const allNotifications = [...realTimeNotifications, ...(data?.items || [])].filter(
    (notification, index, self) => index === self.findIndex(n => n.id === notification.id)
  ) // Remove duplicates by id

  // Filter notifications to last month
  const oneMonthAgo = new Date()

  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  const filteredNotifications = allNotifications.filter(n => new Date(n.createdAt) >= oneMonthAgo)

  useObserver(listRef, filteredNotifications, {
    onBatchIntersect: ids => {
      markAsRead({ ids })
        .unwrap()
        .then(() => {
          setRealTimeNotifications(prev =>
            prev.map(n => (ids.includes(n.id) ? { ...n, isRead: true } : n))
          )
        })
    },
  })

  const unreadCount = filteredNotifications.filter(n => !n.isRead).length

  return (
    <div className={styles.notificationsContainer}>
      <Button className={styles.bellButton} onClick={() => setIsOpen(!isOpen)}>
        <FillBell />
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </Button>

      {isOpen && (
        <div className={styles.notificationsDropdown} ref={listRef}>
          <div className={styles.header}>
            <h3 style={{ color: 'gray' }}>Уведомления</h3>
          </div>
          <div className={styles.notificationsList}>
            {filteredNotifications.length ? (
              filteredNotifications.map(notification => (
                <div
                  className={`${styles.notificationItem} notification-item`}
                  data-id={notification.id}
                  key={notification.id}
                >
                  <NotificationsItem
                    newNotification={!notification.isRead}
                    notification={notification}
                  />
                </div>
              ))
            ) : (
              <p className={styles.empty}>Нет новых уведомлений</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications
