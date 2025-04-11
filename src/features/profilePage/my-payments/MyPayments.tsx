'use client'
import { Typography } from '@/common/components/Typography'
import { useGetPaymentsQuery } from '@/service/accountAndPayments/account'
import { Spinner } from '@radix-ui/themes'

import styles from './payment.module.scss'

export default function PaymentsPage() {
  const { data, isLoading } = useGetPaymentsQuery()

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <div className={styles.profileSettings}>
        <table className={styles.paymentsTable}>
          <thead>
            <tr>
              <th>
                <Typography variant={'h2'}>Date of Payment</Typography>
              </th>
              <th>
                <Typography variant={'h2'}>End Date of Subscription</Typography>
              </th>
              <th>
                <Typography variant={'h2'}>Price</Typography>
              </th>
              <th>
                <Typography variant={'h2'}>Subscription Type</Typography>
              </th>
              <th>
                <Typography variant={'h2'}>Payment Type</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map(payment => (
              <tr key={payment.subscriptionId}>
                <td>{new Date(payment.dateOfPayment).toLocaleDateString()}</td>
                <td>{new Date(payment.endDateOfSubscription).toLocaleDateString()}</td>
                <td>${payment.price}</td>
                <td>{payment.subscriptionType}</td>
                <td>{payment.paymentType}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <button className={'prev'} type={'button'}>
            « Previous
          </button>
          <span>
            Page <strong>1</strong> of <strong>10</strong>
          </span>
          <button className={'next'} type={'button'}>
            Next »
          </button>
          <select>
            <option value={'10'}>Show 10</option>
            <option value={'25'}>Show 25</option>
            <option value={'50'}>Show 50</option>
            <option value={'100'}>Show 100</option>
          </select>
        </div>
      </div>
    </div>
  )
}
