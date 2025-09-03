// src/pages/Home.jsx
import React from 'react'
import Navbar from '../components/Navbar'
import Hero    from '../components/Hero'
import Projects from '../components/Projects'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Projects />
    </div>
  )
}
