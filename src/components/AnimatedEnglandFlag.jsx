import { useEffect, useRef } from 'react'
import anime from 'animejs'

export default function AnimatedEnglandFlag() {
  const ref = useRef(null)

  useEffect(() => {
    const vertical = ref.current.querySelector('.vertical')
    const horizontal = ref.current.querySelector('.horizontal')

    anime({
      targets: vertical,
      scaleX: [0, 1],
      easing: 'easeInOutQuad',
      duration: 1200,
    })

    anime({
      targets: horizontal,
      scaleY: [0, 1],
      easing: 'easeInOutQuad',
      duration: 1200,
      delay: 200,
    })
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <rect width="100" height="100" fill="#fff" />
      <rect
        className="vertical origin-center"
        x="45"
        width="10"
        height="100"
        fill="#c8102e"
        style={{ transform: 'scaleX(0)' }}
      />
      <rect
        className="horizontal origin-center"
        y="45"
        height="10"
        width="100"
        fill="#c8102e"
        style={{ transform: 'scaleY(0)' }}
      />
    </svg>
  )
}

