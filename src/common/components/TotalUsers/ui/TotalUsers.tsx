import styles from './TotalUsers.module.scss'

type Props = {
  totalCount: number
}

export const TotalUsers = ({ totalCount }: Props) => {
  // Разделение числа на цифры, дополненное до 6 символов нулями
  const digits = String(totalCount).padStart(6, '0').split('')

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
