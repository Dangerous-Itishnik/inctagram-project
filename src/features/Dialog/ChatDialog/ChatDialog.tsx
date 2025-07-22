'use client'
import { useEffect } from 'react'

import { SmallAvatar } from '@/common/components/SmallAvatar/SmallAvatar'
import { Typography } from '@/common/components/Typography'
import { MessageBubble } from '@/features/Dialog/MessageBubble/Messagebubble'
import SendMessage from '@/features/Dialog/SendMessage/sendMassege'
import {
  MessageStatus,
  useGetMessageByIdQuery,
  useUpdateMessageStatusMutation,
} from '@/service/messenger/messenger.service'

import styles from './chatDialog.module.scss'

const ChatDialog = ({
  selectedId,
  currentUserId,
  userName,
  id,
}: {
  userName: string
  id: number
  selectedId: number
  currentUserId: number
}) => {
  const {
    data: messages,
    isLoading,
    refetch,
  } = useGetMessageByIdQuery({
    dialoguePartnerId: selectedId,
  })

  const [updateMessageStatus] = useUpdateMessageStatusMutation()

  useEffect(() => {
    if (isLoading || !messages || !messages?.items) {
      return
    }

    const idsToUpdate = messages.items.reduce((acc: number[], item) => {
      if (currentUserId !== item.ownerId && item.status !== MessageStatus.READ) {
        acc.push(item.id)
      }

      return acc
    }, [])

    if (idsToUpdate.length !== 0) {
      updateMessageStatus({ ids: idsToUpdate })
    }
  }, [isLoading, messages?.items, currentUserId, selectedId, messages, updateMessageStatus])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {selectedId && id ? (
          <>
            <SmallAvatar profileId={id} />
            <Typography variant={'h3'}>{userName}</Typography>
          </>
        ) : (
          <Typography>User not found</Typography>
        )}
      </div>

      <div className={styles.messages}>
        {messages?.items.length ? (
          messages.items.map(message => (
            <MessageBubble key={message.id} message={message} currentUserId={currentUserId} />
          ))
        ) : (
          <Typography className={styles.empty}>Choose who you would like to talk to</Typography>
        )}
      </div>
      <div className={styles.footer}>
        <SendMessage receiverId={selectedId} refetch={refetch} />
      </div>
    </div>
  )
}

export default ChatDialog
