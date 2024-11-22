import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CheckBox } from '@/assets/icons/checkBox'
import { Typography } from '@/common/components/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './checkBox.module.scss'

export type CheckboxProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  ({ className, id, label, ...rest }, ref) => {
    const classNames = clsx(s.container, className)

    return (
      <div className={classNames}>
        <CheckboxRadix.Root {...rest} className={s.checkbox} ref={ref}>
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
