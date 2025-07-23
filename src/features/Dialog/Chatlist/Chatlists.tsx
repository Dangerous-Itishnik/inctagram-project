'use client'

import ChatItem from '@/features/Dialog/ChatItem/ChatItem'
import Search from '@/features/search/Search'
import { useGetAllMessagesQuery } from '@/service/messenger/messenger.service'

import styles from './chatlist.module.scss'

const ChatsList = () => {
  const { data } = useGetAllMessagesQuery({
    pageSize: 12,
  })

  return (
    <div className={styles.container}>
      <Search variant={'chat'} />
      <ul className={styles.name}>
        {data?.items.map(item => {
          const avatarUrl =
            item.avatars && item.avatars.length > 0 ? item.avatars[0].url : '/default-avatar.png'

          return (
            <ChatItem
              data={item}
              src={avatarUrl}
              href={`/messenger/${item.receiverId}`}
              key={item.id}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default ChatsList
