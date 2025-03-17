import styles from '@/features/profilePage/ProfileSettings/MyPayments/MobileView/myPaymentsMobile.module.scss'

type Props = {
  date: string
  endDate: string
  paymentType: string
  price: string
  subscriptionType: string
}

export const MyPaymentsMobile = ({
  date,
  endDate,
  paymentType,
  price,
  subscriptionType,
}: Props) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date of Payment</th>
            <th>End Date of Subscription</th>
            <th>Price</th>
            <th>Subscription Type</th>
            <th>Payment Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{date}</td>
            <td>{endDate}</td>
            <td>{price}</td>
            <td>{subscriptionType}</td>
            <td>{paymentType}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
