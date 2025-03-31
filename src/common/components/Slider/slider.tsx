import { CSSProperties, FC } from 'react'

import { Typography } from '@/common/components/Typography'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import styles from './slider.module.scss'

type Props = {
  className?: string
  onChange: (values: number[]) => void
  onValueCommit?: (value: number[]) => void
  rangerLabel?: string
  style?: CSSProperties
  values: number[]
}
export const CustomerSlider: FC<Props> = ({
  className = ' ',
  onChange,
  onValueCommit,
  rangerLabel,

  style,
  values,
}) => {
  return (
    <>
      <Typography variant={'body1'}>{rangerLabel}</Typography>
      <form className={styles.ranger}>
        <SliderPrimitive.Root
          className={clsx(styles.SliderRoot, className)}
          defaultValue={[1, 50]}
          max={3}
          min={1}
          onValueChange={onChange}
          onValueCommit={onValueCommit}
          step={0.1}
          style={style}
          value={values}
        >
          <SliderPrimitive.Track className={styles.SliderTrack}>
            <SliderPrimitive.Range className={styles.SliderRange} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb aria-label={'Volume'} className={styles.SliderThumb} />
        </SliderPrimitive.Root>
      </form>
    </>
  )
}
