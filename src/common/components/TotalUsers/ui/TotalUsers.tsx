import { useEffect } from 'react'

import { useTotalUsersQuery } from '@/service/totalUsers/totalUsers.service'
import { Spinner } from '@radix-ui/themes'

import styles from './TotalUsers.module.scss'

export const TotalUsers = () => {
  const { data: totalUsers, isLoading, refetch } = useTotalUsersQuery()

  useEffect(() => {
    const interval = setInterval(refetch, 60000)

    return () => clearInterval(interval)
  }, [refetch])

  // Разделение числа на цифры, дополненное до 6 символов нулями
  const digits = String(totalUsers ? totalUsers.totalCount : 0)
    .padStart(6, '0')
    .split('')

  if (isLoading && totalUsers) {
    return <Spinner />
  }

  return (
    <div className={styles.counter}>
      <span className={styles.label}>Registered users:</span>
      <div className={styles.digits}>
        {digits.map((digit, index) => (
          <div className={styles.digitContainer} key={index}>
            <div className={styles.digit} style={{ transform: `translateY(-${digit}0%)` }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <span className={styles.digitItem} key={i}>
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
