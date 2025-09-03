// src/pages/Home.jsx
import React from 'react'
import Navbar from '../components/Navbar'
import Hero    from '../components/Hero'
import Projects from '../components/Projects'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Navbar />
      <Hero />
      <Projects />
    </div>
  )
}
