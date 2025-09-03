import React from 'react'
import FractalBackground from './FractalBackground'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

const Hero = () => (
  <section className="relative h-[60vh] w-full overflow-hidden">
    <FractalBackground />
    {/* Full-screen background */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: 'url(/edge-detect.jpg)' }}
    />
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/70" />

    {/* Centered content */}
    <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 mt-16 text-6xl md:text-8xl font-bold text-white drop-shadow-lg">
        Adam Ross
      </h1>
      <p className="mb-8 text-lg md:text-2xl text-gray-300">
        Data specialist who loves building with Python and TypeScript
      </p>
      <div className="mb-10 flex space-x-5">
        <a
          href="/resume.pdf"
          className="px-6 py-3 bg-white text-black rounded-md shadow hover:bg-gray-100 transition"
        >
          Resume
        </a>
        <button className="px-6 py-3 bg-transparent border border-white text-white rounded-md hover:bg-white/10 transition">
          Get in Touch
        </button>
      </div>
      <div className="flex space-x-6 text-white text-2xl">
         <a
          href="https://www.linkedin.com/in/adam-ross-34b79478/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:scale-110 transition-transform"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/adamross94"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:scale-110 transition-transform"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  </section>
)

export default Hero
