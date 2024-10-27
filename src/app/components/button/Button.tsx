import { ReactNode } from 'react'

import styles from './button.module.scss'

type Props = {
  children: ReactNode
  disabled: boolean
  type?: 'default' | 'outline' | 'secondary' | 'text'
}

export const Button = ({ children, disabled, type }: Props) => {
  let className

  if (type === 'outline') {
    className = `${styles.button} ${styles.buttonOutline}`
  } else if (type === 'secondary') {
    className = `${styles.button} ${styles.buttonSecondary}`
  } else if (type === 'text') {
    className = styles.buttonText
  } else {
    className = `${styles.button} ${styles.buttonDefault}`
  }

  return (
    <button className={className} disabled={disabled} type={'button'}>
      <span>{children}</span>
    </button>
  )
}
