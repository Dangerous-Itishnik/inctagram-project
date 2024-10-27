import { useState } from 'react'

import Arrow from '@/icon/arrow/arrow'
import * as Select from '@radix-ui/react-select'

import s from './radixSelect.module.scss'

type Props = {
  onChange: (value: number) => void
  value: number
}

export const RadixSelect = ({ onChange, value = 10 }: Props) => {
  const stringValue = value.toString()
  const handleValueChange = (newValue: string) => {
    const numericValue = parseInt(newValue, 10)

    onChange(numericValue)
  }
  const [direction, setDirection] = useState<'down' | 'up'>('down')

  return (
    <Select.Root
      onOpenChange={isOpen => setDirection(isOpen ? 'up' : 'down')}
      onValueChange={handleValueChange}
      value={stringValue}
    >
      <Select.Trigger className={s.selectTriger}>
        <Select.Value aria-label={stringValue} className={s.selectTrigerValue}>
          {value}
        </Select.Value>
        <Select.Icon className={s.selectTrigerIcon}>
          <Arrow direction={direction} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          align={'center'}
          className={s.selectContent}
          position={'popper'}
          side={'bottom'}
          sideOffset={-3}
        >
          <Select.Viewport className={s.selectViewport}>
            <Select.Item className={s.selectItem} value={'10'}>
              <Select.ItemText>10</Select.ItemText>
            </Select.Item>
            <Select.Item className={s.selectItem} value={'20'}>
              <Select.ItemText>20</Select.ItemText>
            </Select.Item>
            <Select.Item className={s.selectItem} value={'30'}>
              <Select.ItemText>30</Select.ItemText>
            </Select.Item>
            <Select.Item className={s.selectItem} value={'50'}>
              <Select.ItemText>50</Select.ItemText>
            </Select.Item>
            <Select.Item className={s.selectItem} value={'100'}>
              <Select.ItemText>100</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
