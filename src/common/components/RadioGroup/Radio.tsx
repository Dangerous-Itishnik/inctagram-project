import { FC } from 'react'

import { Typography } from '@/common/components/Typography'
import * as RadioGroup from '@radix-ui/react-radio-group'

import styles from './RadioGroup.module.scss'

type Option = {
  label: string
  value: string
}
type Props = {
  className?: string
  defaultValue?: string
  disabled?: boolean
  onValueChange: (value: string) => void
  options: Option[]
  value: string | undefined
}
export const Radio: FC<Props> = ({ defaultValue, disabled, onValueChange, options, value }) => {
  return (
    <span className={styles.radioContent}>
      <RadioGroup.Root
        className={styles.root}
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={onValueChange}
        value={value}
      >
        {options.map(option => {
          return (
            <div className={styles.container} key={option.value}>
              <div className={styles.itemContainer}>
                <RadioGroup.Item className={styles.item} key={option.label} value={option.value}>
                  <RadioGroup.Indicator className={styles.indicator} />
                </RadioGroup.Item>
              </div>

              <Typography style={{ color: '#fff' }} variant={'body1'}>
                {option.label}
              </Typography>
            </div>
          )
        })}
      </RadioGroup.Root>
    </span>
  )
}
