// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react'

const projects = [
  { name: 'coderview',       href: '/projects/coderview' },
  { name: 'streamclout.io',  href: '/projects/streamclout' },
  { name: 'ai architecture', href: '/projects/ai-architecture' },
  { name: 'livestream art',  href: '/projects/livestream-art' },
  { name: 'country density', href: '/projects/country-density' },
]

export default function Navbar() {
  const [currentPath, setCurrentPath] = useState('')
  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto flex h-20 items-center px-6">
        {/* WR square logo */}
        <a
          href="/"
          className="flex h-10 w-10 items-center justify-center bg-white/10 text-white font-bold rounded-sm"
        >
          AR
        </a>

        {/* center nav links */}
        <nav className="ml-8 hidden md:flex items-center space-x-6 text-base">
          {projects.map(({ name, href }) => {
            const isActive = currentPath === href
            return (
              <a
                key={name}
                href={href}
                className={
                  `px-3 py-1 rounded-md transition-colors ` +
                  (isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10')
                }
              >
                {name}
              </a>
            )
          })}
        </nav>

        {/* CTA button */}
        <button className="ml-auto px-4 py-2 bg-white text-black rounded-md shadow-sm hover:shadow transition-shadow">
          Get in Touch
        </button>
      </div>
    </header>
  )
}
