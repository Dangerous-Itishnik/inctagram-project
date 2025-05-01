import { useState } from 'react'

import OutlineBell from '@/assets/icons/components/OutlineBell'
import { NotificationItem } from '@/common/components/NotificationItem'
import { Typography } from '@/common/components/Typography'
import { useGetNotificationsQuery } from '@/service/notifications/notifications.service'

import styles from './notifications.module.scss'

export const Notifications = () => {
  const [openNotification, setOpenNotification] = useState<boolean>(false)
  const { data } = useGetNotificationsQuery()

  // const dataSocket = socketApi()
  //
  // console.log(dataSocket)

  const handelOpenNotification = () => {
    setOpenNotification(prev => !prev)
  }

  return (
    <div className={styles.container}>
      <div className={styles.outlineBell}>
        <OutlineBell onClick={handelOpenNotification} />
        {/*{unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}*/}
      </div>
      {openNotification && (
        <div className={styles.notificationModal}>
          <div className={styles.listOfMessages}>
            <Typography variant={'h2'}>Уведомления</Typography>
            <div className={styles.createLine}></div>
          </div>
          <div className={styles.notificationItem}>
            {data.items.map(notificationItem => (
              <div key={notificationItem.id}>
                <NotificationItem notification={notificationItem} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
