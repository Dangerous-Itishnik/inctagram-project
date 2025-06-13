'use client'
import { useCallback, useState } from 'react'

import UserSearch from '@/common/components/userSearch/UserSearch'
import { Link } from '@/i18n/navigation'
import { useGetUsersQuery } from '@/service/user/user.servise'
import Image from 'next/image'

import styles from './user.module.scss'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
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
      <UserSearch onSearch={handleSearch} />
      <div className={styles.usersList}>
        {searchTerm && data?.items
          ? data.items.map(user => (
              <div className={styles.userItem} key={user.id}>
                <div>
                  <Image
                    alt={'avatar'}
                    height={36}
                    priority
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
            ))
          : null}
      </div>
    </div>
  )
}

export default Search
