'use client'
import { useCallback, useState } from 'react'

import UserSearch from '@/common/components/userSearch/UserSearch'
import { Link } from '@/i18n/navigation'
import { useGetUsersQuery } from '@/service/user/user.servise'
import Image from 'next/image'

import defaultStyles from './user.module.scss'
import chatStyles from '@/features/Dialog/Chatlist/chatlist.module.scss'

type Props = {
  variant?: 'default' | 'chat'
}

const Search = ({ variant = 'default' }: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const styles = variant === 'chat' ? chatStyles : defaultStyles
  const { data, refetch } = useGetUsersQuery({
    pageNumber: 1,
    pageSize: 10,
    search: searchTerm,
  })

  const handleSearch = useCallback(
    (newSearchTerm: string) => {
      setSearchTerm(newSearchTerm)

      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        refetch({
          pageSize: 4,
          searchTerm: newSearchTerm,
        })
      }, 100)
    },
    [refetch]
  )

  return (
    <div className={styles.container}>
      <div className={variant === 'chat' ? styles.search : undefined}>
        <UserSearch onSearch={handleSearch} />
      </div>

      {variant === 'default' ? (
        <div className={styles.usersList}>
          {searchTerm &&
            data?.items?.map(user => (
              <div className={styles.userItem} key={user.id}>
                <div>
                  <Image
                    alt={'avatar'}
                    height={36}
                    sizes={'22vw'}
                    src={user.avatars[0]?.url}
                    style={{ borderRadius: '50%' }}
                    width={36}
                  />
                </div>
                <div className={styles.userInfo}>
                  <Link href={`/profile/${user.id}`}>{user.userName}</Link>
                  <p>{user.userName}</p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <ul className={styles.name}>
          {searchTerm &&
            data?.items?.map(user => (
              <li key={user.id} className={styles.li}>
                <div>
                  <Image
                    alt={'photo'}
                    height={36}
                    sizes={'22vw'}
                    src={user.avatars[0]?.url}
                    style={{ borderRadius: '50%' }}
                    width={36}
                  />
                </div>
                <div className={styles.userInfo}>
                  <Link href={`/profile/${user.id}`}>{user.userName}</Link>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default Search
