import { RefObject, useEffect, useRef } from 'react'

type UseObserverOptions = {
  delay?: number
  onLoadMore: () => void
  root?: HTMLElement | null
  threshold?: number
}

export function useObserver(
  listRef: RefObject<HTMLElement>,
  data: { id: number }[] | undefined,
  options: UseObserverOptions
) {
  const callbackRef = useRef(options.onLoadMore)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isObservingRef = useRef(false)

  callbackRef.current = options.onLoadMore

  useEffect(() => {
    const element = listRef.current

    if (!element || !data || data.length === 0) {
      return
    }

    if (observerRef.current) {
      observerRef.current.disconnect()
      isObservingRef.current = false
    }

    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isObservingRef.current) {
            isObservingRef.current = true

            setTimeout(() => {
              if (callbackRef.current) {
                callbackRef.current()
              }

              setTimeout(() => {
                isObservingRef.current = false
              }, 1000)
            }, 100)
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: options.threshold ?? 0.1,
      }
    )
    const observeLastElement = () => {
      const items = element.querySelectorAll('[data-id]')

      if (items.length > 0) {
        const lastItem = items[items.length - 1]

        if (lastItem && observerRef.current) {
          observerRef.current.observe(lastItem)
        }
      }
    }

    const timeoutId = setTimeout(observeLastElement, 200)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      clearTimeout(timeoutId)
      isObservingRef.current = false
    }
  }, [data?.length])
}
