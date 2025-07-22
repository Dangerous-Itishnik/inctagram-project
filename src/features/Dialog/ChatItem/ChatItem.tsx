import { Typography } from '@/common/components/Typography'
import { Link } from '@/i18n/navigation'
import { type Message } from '@/service/messenger/messenger.service'
import Image from 'next/image'

import styles from './chatItem.module.scss'

type Props = {
  data: Message
  src: string
  href: string
}
const ChatItem = ({ data, src, href }: Props) => {
  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
      })
    } else if (diffDays <= 2) {
      return date
        .toLocaleDateString('de-DE', {
          weekday: 'short',
        })
        .replace('.', '')
    } else {
      return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    }
  }

  return (
    <Link className={styles.container} href={href}>
      <div>
        <Image
          alt={'avatar'}
          height={36}
          sizes={'22vw'}
          src={src}
          style={{ borderRadius: '50%' }}
          width={36}
        />
      </div>
      <div style={{ width: '100%' }}>
        <div className={styles.name}>
          <Typography variant={'body2'}>{data.userName}</Typography>
          <Typography variant={'body2'}>{formatMessageTime(data.createdAt)}</Typography>
        </div>
        <Typography variant={'body2'} style={{ fontStyle: 'italic' }}>
          {data.messageText}
        </Typography>
      </div>
    </Link>
  )
}

export default ChatItem
