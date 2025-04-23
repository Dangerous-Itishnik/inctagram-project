import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CheckBox } from '@/assets/icons/checkBox'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './checkBox.module.scss'

import { Typography } from '../Typography'

export type CheckboxProps = {
  checked?: boolean
  disabled?: boolean
  label?: string
  onCheckedChange?: (checked: boolean) => void
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  ({ checked, className, id, label, onCheckedChange, ...rest }, ref) => {
    const classNames = clsx(s.container, className)

    return (
      <div className={classNames}>
        <CheckboxRadix.Root
          {...rest}
          checked={checked}
          className={s.checkbox}
          onCheckedChange={onCheckedChange}
          ref={ref}
        >
          <CheckboxRadix.Indicator>
            <CheckBox />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        {label && (
          <Typography as={'label'} className={s.label} htmlFor={id} variant={'body2'}>
            {label}
          </Typography>
        )}
      </div>
    )
  }
)
