import CheckmarkOutline from '@/assets/icons/components/CheckmarkOutline'
import DoneAllOutline from '@/assets/icons/components/DoneAllOutline'
import { SmallAvatar } from '@/common/components/SmallAvatar/SmallAvatar'
import { ByUser, MessageStatus } from '@/service/messenger/messenger.service'
import { formatDistance } from 'date-fns'

import styles from './MessageBubble.module.scss'

type Props = {
  className?: string
  currentUserId: number
  message: ByUser
}

export const MessageBubble = ({ className, currentUserId, message }: Props) => {
  const isSent = message?.ownerId === currentUserId

  return (
    <div className={`${styles.container} ${isSent ? styles.sent : ''} ${className || ''}`}>
      {!isSent && <SmallAvatar profileId={currentUserId} />}
      <div className={`${styles.bubble} ${isSent ? styles.sentBubble : ''}`}>
        <p className={styles.messageText}>{message?.messageText}</p>
        <span className={`${styles.time} ${isSent ? styles.sentTime : ''}`}>
          <time>
            {formatDistance(new Date(message?.createdAt ?? 0), new Date(), { addSuffix: true })}
          </time>
          {isSent && (
            <span
              className={`${styles.status} ${
                message.status === MessageStatus.READ ? styles.readStatus : ''
              }`}
            >
              {message.status === MessageStatus.SENT && <CheckmarkOutline height={16} width={16} />}
              {(message.status === MessageStatus.RECEIVED ||
                message.status === MessageStatus.READ) && <DoneAllOutline height={16} width={16} />}
            </span>
          )}
        </span>
      </div>
    </div>
  )
}
