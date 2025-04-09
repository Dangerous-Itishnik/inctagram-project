'use client'
import { useGetPaymentsQuery } from '@/service/accountAndPayments/account'

import styles from './payment.module.scss'

const Page = () => {
  const { data } = useGetPaymentsQuery()

  return (
    <div>
      <div className={styles.profileSettings}>
        <h2>My Payments</h2>
        <table className={styles.paymentsTable}>
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
            {data?.map(payment => (
              <tr key={payment.subscriptionId}>
                <td className={'py-2 px-4'}>
                  {new Date(payment.dateOfPayment).toLocaleDateString()}
                </td>
                <td className={'py-2 px-4'}>
                  {new Date(payment.endDateOfSubscription).toLocaleDateString()}
                </td>
                <td className={'py-2 px-4'}>${payment.price.toFixed(2)}</td>
                <td className={'py-2 px-4'}>{payment.subscriptionType}</td>
                <td className={'py-2 px-4'}>{payment.paymentType}</td>
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

export default Page
