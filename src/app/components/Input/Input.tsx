'use client'

import React, { useState } from 'react'

import styles from './input.module.scss'

export type InputProps = {
  errorMessage?: string
  label: string
  onChangeHandler: (value: string) => void
  onFocus?: () => void
  type?: 'password' | 'search' | 'text'
  value: string
} & React.HTMLAttributes<HTMLInputElement>

export const Input = ({
  errorMessage,
  label,
  onChangeHandler,
  onFocus,
  type,
  value,
}: InputProps) => {
  const [showText, setShowText] = useState(false)

  const togglePasswordVisibility = () => {
    setShowText(prev => !prev)
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(event.currentTarget.value)
  }
  const classNameInput = type === 'search' ? `${styles.input} ${styles.inputSearch}` : styles.input
  const inputType = showText ? 'password' : 'text'
  let buttonType

  if (type === 'password') {
    buttonType = <button className={styles.button} onClick={togglePasswordVisibility}></button>
  }
  if (type === 'search') {
    buttonType = <button className={styles.buttonSearch} onClick={() => {}}></button>
  }

  return (
    <div className={`${styles.container} ${errorMessage && styles.error}`}>
      <label className={styles.label} htmlFor={label}>
        {label}
      </label>
      <input
        className={classNameInput}
        name={label}
        onChange={onChange}
        onFocus={onFocus}
        type={inputType}
        value={value}
      ></input>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {buttonType}
    </div>
  )
}
