// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

const projects = [
  { name: 'coderview',       href: '/projects/coderview' },
  { name: 'streamclout.io',  href: '/projects/streamclout' },
  { name: 'ai architecture', href: '/projects/ai-architecture' },
  { name: 'livestream art',  href: '/projects/livestream-art' },
  { name: 'country density', href: '/projects/country-density' },
]

export default function Navbar() {
  const [currentPath, setCurrentPath] = useState('')
  const [theme, setTheme] = useState(
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  )

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', newTheme)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white dark:bg-black backdrop-blur-lg border-b border-black/10 dark:border-white/20">
      <div className="container mx-auto flex h-20 items-center px-6">
        {/* WR square logo */}
        <a
          href="/"
          className="flex h-10 w-10 items-center justify-center bg-black/10 text-black font-bold rounded-sm dark:bg-white/10 dark:text-white"
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
                    ? 'bg-black/20 text-black dark:bg-white/20 dark:text-white'
                    : 'text-black/80 hover:text-black hover:bg-black/10 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10')
                }
              >
                {name}
              </a>
            )
          })}
        </nav>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="ml-auto p-2 rounded-md bg-black text-white dark:bg-white dark:text-black shadow-sm hover:shadow transition-shadow"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  )
}
