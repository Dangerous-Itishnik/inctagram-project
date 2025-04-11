'use client'
import React, { useState } from 'react'

import { Typography } from '@/common/components/Typography'
import { useGetPaymentsQuery } from '@/service/accountAndPayments/account'
import { Spinner } from '@radix-ui/themes'

import styles from './payment.module.scss'

const PaymentPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { data, isLoading } = useGetPaymentsQuery()

  const totalItems = data?.length
  const totalPages = Math.ceil(totalItems! / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = data?.slice(startIndex, endIndex)

  // Handler functions
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

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
            {currentItems?.map(payment => (
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
          <button
            className={styles.prev}
            disabled={currentPage === 1}
            onClick={handlePrevious}
            type={'button'}
          >
            « Previous
          </button>

          <span>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            className={styles.next}
            disabled={currentPage === totalPages}
            onClick={handleNext}
            type={'button'}
          >
            Next »
          </button>
          <select
            className={styles.itemsPerPage}
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
          >
            <option value={10}>Show 10</option>
            <option value={25}>Show 25</option>
            <option value={50}>Show 50</option>
            <option value={100}>Show 100</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
