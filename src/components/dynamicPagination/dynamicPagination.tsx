'use client'
import { useState } from 'react'

import { usePageNumbers } from '@/components/dynamicPagination/hook'
import { PageNavigationButton } from '@/components/dynamicPagination/pageNavigationButton'
import { RadixSelect } from '@/components/radixSelect'
import Arrow from '@/icon/arrow/arrow'

import s from './dynamicPagination.module.scss'

export const DynamicPagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(100)
  const totalItems = 5500

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const pageNumbers = usePageNumbers(totalPages, currentPage, handlePageChange)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  return (
    <div className={s.paginationContainer}>
      <PageNavigationButton
        disabled={currentPage === 1}
        handlePaginationButtonClick={handlePreviousPage}
        icon={<Arrow direction={'right'} />}
      />
      {pageNumbers}
      <PageNavigationButton
        disabled={currentPage === totalPages}
        handlePaginationButtonClick={handleNextPage}
        icon={<Arrow direction={'left'} />}
      />
      <RadixSelect onChange={handleItemsPerPageChange} value={itemsPerPage} />
    </div>
  )
}
