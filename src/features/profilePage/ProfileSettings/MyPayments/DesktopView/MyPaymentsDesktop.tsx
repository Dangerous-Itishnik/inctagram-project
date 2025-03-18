import styles from '@/features/profilePage/ProfileSettings/MyPayments/DesktopView/myPaymentsDesktop.module.scss'

type PaymentProps = {
  date: string
  endDate: string
  paymentType: string
  price: string
  subscriptionType: string
}

type Props = {
  payments: PaymentProps[]
}

export const MyPaymentsDesktop = ({ payments }: Props) => {
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
          {payments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.date}</td>
              <td>{payment.endDate}</td>
              <td>{payment.price}</td>
              <td>{payment.subscriptionType}</td>
              <td>{payment.paymentType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
