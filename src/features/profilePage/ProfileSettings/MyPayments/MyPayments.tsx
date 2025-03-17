import { useState } from 'react'

import { MyPaymentsDesktop } from '@/features/profilePage/ProfileSettings/MyPayments/DesktopView/MyPaymentsDesktop'
import { MyPaymentsMobile } from '@/features/profilePage/ProfileSettings/MyPayments/MobileView/MyPaymentsMobile'
import { useMediaQuery } from '@react-hook/media-query'

import styles from '@/features/profilePage/ProfileSettings/MyPayments/myPayments.module.scss'

export const MyPayments = () => {
  const paymentData = [
    {
      date: '2023-01-01',
      endDate: '2023-02-01',
      paymentType: 'Credit Card',
      price: '$10',
      subscriptionType: 'Monthly',
    },
    {
      date: '2023-01-15',
      endDate: '2023-02-15',
      paymentType: 'PayPal',
      price: '$50',
      subscriptionType: 'Quarterly',
    },
    {
      date: '2023-02-01',
      endDate: '2023-03-01',
      paymentType: 'Debit Card',
      price: '$100',
      subscriptionType: 'Yearly',
    },
    {
      date: '2023-02-15',
      endDate: '2023-03-15',
      paymentType: 'Credit Card',
      price: '$10',
      subscriptionType: 'Monthly',
    },
    {
      date: '2023-03-01',
      endDate: '2023-04-01',
      paymentType: 'PayPal',
      price: '$50',
      subscriptionType: 'Quarterly',
    },
    {
      date: '2023-03-15',
      endDate: '2023-04-15',
      paymentType: 'Debit Card',
      price: '$100',
      subscriptionType: 'Yearly',
    },
    {
      date: '2023-04-01',
      endDate: '2023-05-01',
      paymentType: 'Credit Card',
      price: '$10',
      subscriptionType: 'Monthly',
    },
    {
      date: '2023-04-15',
      endDate: '2023-05-15',
      paymentType: 'PayPal',
      price: '$50',
      subscriptionType: 'Quarterly',
    },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const totalPages = Math.ceil(paymentData.length / itemsPerPage)

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = event => {
    setItemsPerPage(event.target.value)
    setCurrentPage(1)
  }

  const getPaginatedData = () => {
    const start = (currentPage - 1) * itemsPerPage

    return paymentData.slice(start, start + itemsPerPage)
  }

  const isMobile = useMediaQuery('(max-width: 376px)')

  return (
    <div>
      {isMobile
        ? getPaginatedData().map((payment, index) => (
            <MyPaymentsMobile
              date={payment.date}
              endDate={payment.endDate}
              key={index}
              paymentType={payment.paymentType}
              price={payment.price}
              subscriptionType={payment.subscriptionType}
            />
          ))
        : getPaginatedData().map((payment, index) => (
            <MyPaymentsDesktop
              date={payment.date}
              endDate={payment.endDate}
              key={index}
              paymentType={payment.paymentType}
              price={payment.price}
              subscriptionType={payment.subscriptionType}
            />
          ))}

      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          type={'button'}
        >
          &lt;
        </button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
          const pageNumber = index + 1

          return (
            <button
              className={currentPage === pageNumber ? styles.active : ''}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              type={'button'}
            >
              {pageNumber}
            </button>
          )
        })}

        {totalPages > 5 && <span>...</span>}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          type={'button'}
        >
          &gt;
        </button>

        <span className={styles.showText}>Show</span>
        <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <span className={styles.onPageText}>on page</span>
      </div>
    </div>
  )
}
