import { ChangeEvent, ComponentProps, forwardRef } from 'react'

import styles from './TextArea.module.scss'
type Props = {
  errorMessage?: string
  isError?: boolean
  label?: string
} & ComponentProps<'textarea'>
export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, errorMessage, isError, label, onChange, ...rest }, ref) => {
    function handleInputValueChanged(e: ChangeEvent<HTMLTextAreaElement>) {
      onChange?.(e)
    }

    return (
      <div className={styles.container}>
        {label && <label className={styles.label}>{label}</label>}
        <textarea
          className={`${styles.textarea} ${isError ? styles.error : ''} ${className || ''}`}
          onChange={handleInputValueChanged}
          ref={ref}
          {...rest}
        />

        {isError && errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
    )
  }
)
