import { useState, useEffect, useRef } from 'react'

export function useCountUp(target: number, duration: number, inView: boolean): number {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 2)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return count
}
