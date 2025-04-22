import { useEffect, useRef, useState } from 'react'

import { FillBell } from '@/assets/icons/components'
import NotificationsItem from '@/common/components/NotificationsItem/NotificationsItem'
import { Button } from '@/common/components/button'
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from '@/service/notifications/notoficationsApi'

import styles from './notification.module.scss'

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useGetNotificationsQuery()
  const [markAsRead] = useMarkAsReadMutation()
  const listRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>()

  useEffect(() => {
    if (!listRef.current || !data?.items) {
      return
    }

    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const notificationId = Number(entry.target.getAttribute('data-id'))

            if (notificationId) {
              markAsRead({ ids: [notificationId] }).unwrap()
            }
          }
        })
      },
      {
        root: listRef.current,
        threshold: 0.1,
      }
    )

    const items = listRef.current.querySelectorAll('.notification-item')

    items.forEach(item => observerRef.current?.observe(item))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [data, markAsRead])

  const toggleNotifications = () => {
    setIsOpen(!isOpen)
  }

  const unreadCount = data?.items?.filter(n => !n.isRead).length || 0

  return (
    <div className={styles.notificationsContainer}>
      <Button className={styles.bellButton} onClick={toggleNotifications}>
        <FillBell />
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </Button>

      {isOpen && (
        <div className={styles.notificationsDropdown} ref={listRef}>
          <div className={styles.header}>
            <h3 style={{ color: 'gray' }}>Уведомления</h3>
          </div>
          <div className={styles.notificationsList}>
            {data?.items?.length ? (
              data.items.map(notification => (
                <div
                  className={`${styles.notificationItem} notification-item`}
                  data-id={notification.id}
                  key={notification.id}
                >
                  <NotificationsItem
                    newNotification={notification.isRead}
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
