import { ReactNode } from 'react'

import s from './pageNavigationButton.module.scss'
type Props = {
  disabled: boolean
  handlePaginationButtonClick: () => void
  icon: ReactNode
}
export const PageNavigationButton = ({ disabled, handlePaginationButtonClick, icon }: Props) => {
  return (
    <button
      className={s.pageButton}
      disabled={disabled}
      onClick={handlePaginationButtonClick}
      type={'button'}
    >
      {icon}
    </button>
  )
}
