import { Checkbox } from '@/common/components/CheckBox'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/features/profilePage/ProfileSettings/AccountManagement/payments.module.scss'

export const Subscription = () => {
  return (
    <div className={styles.container}>
      <h3>Your subscription costs:</h3>
      <div className={styles.subscription}>
        <div>
          <Checkbox />
          <span>$10 per 1 Day</span>
        </div>
        <div>
          <Checkbox />
          <span>$50 per 7 Day</span>
        </div>
        <div>
          <Checkbox />
          <span>$100 per month</span>
        </div>
      </div>
      <div className={styles.payments}>
        <Link href={''}>
          <Image alt={''} height={64} src={'/paypalLogo.png'} width={96} />
        </Link>
        <p>Or</p>
        <Link href={''}>
          <Image alt={''} height={64} src={'/stripeLogo.png'} width={96} />
        </Link>
      </div>
    </div>
  )
}
