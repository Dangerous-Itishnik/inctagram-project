import { useCallback, useMemo } from 'react'

import s from '../pageNavigationButton/pageNavigationButton.module.scss'

export const usePageNumbers = (
  totalPages: number,
  currentPage: number,
  handlePageChange: (page: number) => void
) => {
  const createButton = useCallback(
    (page: number, isActive: boolean) => (
      <button
        className={`${s.pageButton} ${isActive ? s.active : ''}`}
        key={page}
        onClick={() => handlePageChange(page)}
        type={'button'}
      >
        {page}
      </button>
    ),
    [handlePageChange]
  )

  const createEllipsis = useMemo(
    () => (key: string) => (
      <span className={s.ellipsis} key={key}>
        ...
      </span>
    ),
    []
  )

  return useMemo(() => {
    const pageNumbers = []
    const maxPagesToShow = 3
    const startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPagesToShow / 2))

    if (currentPage <= 4) {
      // Отображение первых 5 страниц
      for (let i = 1; i <= Math.min(5, totalPages); i++) {
        pageNumbers.push(createButton(i, i === currentPage))
      }
      if (totalPages > 5) {
        pageNumbers.push(createEllipsis('ellipsis'))
        pageNumbers.push(createButton(totalPages, false))
      }
    } else if (currentPage >= totalPages - 3) {
      // Отображение последних 5 страниц
      pageNumbers.push(createButton(1, false))
      if (totalPages > 5) {
        pageNumbers.push(createEllipsis('ellipsis'))
      }
      for (let i = Math.max(totalPages - 4, 1); i <= totalPages; i++) {
        pageNumbers.push(createButton(i, i === currentPage))
      }
    } else {
      // Текущая страница где-то посередине
      pageNumbers.push(createButton(1, false))
      pageNumbers.push(createEllipsis('start-ellipsis'))

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(createButton(i, i === currentPage))
      }

      pageNumbers.push(createEllipsis('end-ellipsis'))
      pageNumbers.push(createButton(totalPages, false))
    }

    return pageNumbers
  }, [totalPages, currentPage, createButton, createEllipsis])
}
