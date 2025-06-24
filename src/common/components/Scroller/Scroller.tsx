import { ReactNode, RefObject, useRef } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'

import styles from './scroller.module.scss'

export type ScrollerOrientation = 'horizontal' | 'vertical'

export type ScrollerProps = Readonly<{
  children: ReactNode
  className?: string
  customHeight?: string
  customWidth?: string
  orientation?: ScrollerOrientation
  theme?: 'dark' | 'light'
  viewportRef?: RefObject<HTMLDivElement>
}>

export const Scroller = ({ theme, ...props }: ScrollerProps) => {
  const viewportRef = useRef<HTMLDivElement>(null)

  return (
    <ScrollArea.Root
      className={styles.scrollAreaRoot}
      data-theme={theme}
      scrollHideDelay={600}
      style={{
        height: props.customHeight,
        width: props.customWidth,
      }}
    >
      <ScrollArea.Viewport className={styles.scrollAreaViewport} ref={viewportRef}>
        <div className={props.className}>{props.children}</div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={styles.scrollAreaScrollbar} orientation={'vertical'}>
        <ScrollArea.Thumb className={styles.scrollAreaThumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar className={styles.scrollAreaScrollbar} orientation={'horizontal'}>
        <ScrollArea.Thumb className={styles.scrollAreaThumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className={styles.scrollAreaCorner} />
    </ScrollArea.Root>
  )
}
