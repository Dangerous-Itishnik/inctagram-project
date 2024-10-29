'use client'

import React, { forwardRef, useState } from 'react'

import { combineClasses } from '@/common/utils/combineClasses'

import styles from './input.module.scss'

export type InputProps = {
  errorMessage?: string
  label: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  propsClassName?: string
  type?: 'password' | 'search' | 'text'
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, label, onChange, onFocus, propsClassName, type, ...inputProps }, ref) => {
    const [showText, setShowText] = useState(true)

    const togglePasswordVisibility = () => {
      setShowText(prev => !prev)
    }

    const classNameInput =
      type === 'search' ? `${styles.input} ${styles.inputSearch}` : styles.input

    const inputType = type === 'password' && showText ? 'password' : 'text'
    const buttonType =
      type === 'password' ? (
        <button
          className={styles.button}
          onClick={togglePasswordVisibility}
          type={'button'}
        ></button>
      ) : type === 'search' ? (
        <button className={styles.buttonSearch} onClick={() => {}} type={'button'}></button>
      ) : null

    return (
      <div
        className={combineClasses(styles.container, propsClassName, errorMessage && styles.error)}
      >
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
