'use client'

import React, { forwardRef, useState } from 'react'

import styles from './input.module.scss'

export type InputProps = {
  errorMessage?: string
  label: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  type?: 'password' | 'search' | 'text'
} & React.HTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, label, onChange, onFocus, type, ...inputProps }, ref) => {
    const [showText, setShowText] = useState(false)

    const togglePasswordVisibility = () => {
      setShowText(prev => !prev)
    }

    const classNameInput =
      type === 'search' ? `${styles.input} ${styles.inputSearch}` : styles.input
    const inputType = type === 'password' && showText ? 'password' : 'text'
    let buttonType

    if (type === 'password') {
      buttonType = (
        <button
          className={styles.button}
          onClick={togglePasswordVisibility}
          type={'button'}
        ></button>
      )
    }
    if (type === 'search') {
      buttonType = (
        <button className={styles.buttonSearch} onClick={() => {}} type={'button'}></button>
      )
    }

    return (
      <div className={`${styles.container} ${errorMessage && styles.error}`}>
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
        <input
          ref={ref}
          {...inputProps}
          className={classNameInput}
          name={label}
          onChange={onChange}
          onFocus={onFocus}
          type={inputType}
        ></input>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {buttonType}
      </div>
    )
  }
)