import { useEffect, useRef, useState } from 'react'

export default function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px', ...options }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
