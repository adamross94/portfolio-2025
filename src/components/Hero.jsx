import React from 'react'
import FractalBackground from './FractalBackground'
import { FaLinkedin, FaGithub, FaFilePdf, FaEnvelope } from 'react-icons/fa'

const Hero = () => (
  <section className="relative h-[60vh] w-full overflow-hidden">
    <FractalBackground />
    {/* Full-screen background */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: 'url(/edge-detect.jpg)' }}
    />
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-white/70 dark:bg-black/70" />

    {/* Centered content */}
    <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 mt-16 text-6xl md:text-8xl font-bold text-black dark:text-white drop-shadow-lg">
        Adam Ross
      </h1>
      <p className="mb-8 text-lg md:text-2xl text-gray-700 dark:text-gray-300">
        Data specialist who loves building with Python and TypeScript
      </p>
      <div className="mb-10 flex space-x-5">
        <a
          href="/resume.pdf"
          className="px-6 py-3 bg-black text-white rounded-md shadow hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-gray-100 flex items-center"
        >
          <FaFilePdf className="mr-2" />
          Resume
        </a>
        <button className="px-6 py-3 bg-transparent border border-black text-black rounded-md hover:bg-black/10 transition dark:border-white dark:text-white dark:hover:bg-white/10 flex items-center">
          <FaEnvelope className="mr-2" />
          Get in Touch
        </button>
      </div>
      <div className="flex space-x-6 text-black dark:text-white text-2xl">
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
