import { useEffect, useRef } from 'react'
import anime from 'animejs/lib/anime.es.js'

export default function AnimatedWyvernFlag() {
  const ref = useRef(null)

  useEffect(() => {
    const wyvern = ref.current.querySelector('.wyvern-path')
    const length = wyvern.getTotalLength()
    wyvern.style.strokeDasharray = length
    wyvern.style.strokeDashoffset = length

    anime({
      targets: wyvern,
      strokeDashoffset: [length, 0],
      easing: 'easeInOutSine',
      duration: 2000,
      complete: () => wyvern.setAttribute('fill', '#fff'),
    })
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <rect width="640" height="400" fill="#c8102e" />
      <path
        className="wyvern-path"
        d="M96 248c35-90 119-116 119-116s5-34 31-54c26-20 40 25 40 25s31-38 58-13 8 63 8 63 43-23 61-5-29 60-29 60 41 18 38 48-49 18-49 18 35 33 18 46c-17 13-68-24-68-24s1 32-24 33c-25 1-41-47-41-47s-29 47-55 34 0-63 0-63-56 31-81 15c-25-16-6-50-6-50s-46 18-41-19z"
        fill="none"
        stroke="#fff"
        strokeWidth="8"
        strokeLinejoin="round"
      />
    </svg>
  )
}
