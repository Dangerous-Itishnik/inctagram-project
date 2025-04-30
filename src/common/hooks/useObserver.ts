// hooks/useObserver.ts
import { RefObject, useEffect, useRef } from 'react'

type UseObserverOptions = {
  delay?: number // debounce delay
  onBatchIntersect: (ids: number[]) => void
  root?: HTMLElement | null
  threshold?: number
}

export function useObserver(
  listRef: RefObject<HTMLElement>,
  data: { id: number }[] | undefined,
  options: UseObserverOptions
) {
  const seenIdsRef = useRef<Set<number>>(new Set())
  const batchRef = useRef<number[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!listRef.current || !data) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'))

            if (id && !seenIdsRef.current.has(id)) {
              seenIdsRef.current.add(id)
              batchRef.current.push(id)
            }
          }
        })

        // debounce: send batch after delay
        if (batchRef.current.length > 0 && !timerRef.current) {
          timerRef.current = setTimeout(() => {
            options.onBatchIntersect([...batchRef.current])
            batchRef.current = []
            timerRef.current = null
          }, options.delay || 500) // default 500ms
        }
      },
      {
        root: options.root || listRef.current,
        threshold: options.threshold ?? 0.1,
      }
    )

    const items = listRef.current.querySelectorAll('[data-id]')

    items.forEach(item => observer.observe(item))

    return () => {
      observer.disconnect()
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [listRef, data, options])
}
