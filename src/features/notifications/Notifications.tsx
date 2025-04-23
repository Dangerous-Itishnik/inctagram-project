import { useEffect, useRef, useState } from 'react'

import OutlineBell from '@/assets/icons/components/OutlineBell'
import NotificationsItem from '@/common/components/NotificationsItem/NotificationsItem'
import { Typography } from '@/common/components/Typography'
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
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

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

    return () => {
      SocketApi.socket?.off('notifications', handleNotification)
    }
  }, [])

  const allNotifications = [...realTimeNotifications, ...(data?.items || [])].filter(
    (notification, index, self) => index === self.findIndex(n => n.id === notification.id)
  )

  // Filter notifications to last month
  const oneMonthAgo = new Date()

  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  const filteredNotifications = allNotifications.filter(n => new Date(n.createdAt) >= oneMonthAgo)

  useObserver(listRef, filteredNotifications, {
    onBatchIntersect: ids => {
      markAsRead({ ids }).unwrap()
    },
  })

  const unreadCount = filteredNotifications.filter(n => !n.isRead).length

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.bellButton} onClick={() => setIsOpen(!isOpen)} ref={buttonRef}>
        <OutlineBell />
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </div>

      {isOpen && (
        <div className={styles.notificationsDropdown} ref={listRef}>
          <div className={styles.header}>
            <Typography variant={'h2'}>Уведомления</Typography>
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
