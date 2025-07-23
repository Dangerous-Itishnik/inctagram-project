'use client'
import { useConnectSocket } from '@/common/hooks/useConnectSocket'
import ChatDialog from '@/features/Dialog/ChatDialog/ChatDialog'
import Chatlists from '@/features/Dialog/Chatlist/Chatlists'
import { useMeQuery } from '@/service/auth'
import { useGetProfileByIdQuery } from '@/service/messenger/messenger.service'
import { useParams } from 'next/navigation'

import styles from './dialog.module.scss'

const DialogRoom = () => {
  const params = useParams()
  const selectedId = Number(params.selectedId)
  const { data: profile } = useGetProfileByIdQuery(selectedId)
  const { data: currentUser } = useMeQuery()

  useConnectSocket()
  const currentUserId = currentUser?.userId

  if (!selectedId) {
    return (
      <div className={styles.container}>
        <Chatlists />
        <div>Choose your Dialog partner</div>
      </div>
    )
  }

  if (!profile || !currentUserId) {
    return (
      <div className={styles.container}>
        <Chatlists />
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Chatlists />
      {selectedId ? (
        <ChatDialog
          selectedId={selectedId}
          currentUserId={currentUserId!}
          id={profile?.id}
          userName={profile?.userName}
        />
      ) : (
        'Chose your Dialog partner'
      )}
    </div>
  )
}

export default DialogRoom
