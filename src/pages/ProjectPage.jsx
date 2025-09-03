// src/pages/ProjectPage.jsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { projects } from '../data/projects'
import { FaGithub, FaGlobe } from 'react-icons/fa'       

export default function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="mt-20 flex items-center justify-center h-screen bg-black">
          <p className="text-white">
            Project “{slug}” not found.{' '}
            <Link to="/" className="underline text-blue-400">
              Go back home
            </Link>
            .
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      {/* FULL-WIDTH BLACK WRAPPER */}
      <div className="bg-black text-white pt-20 min-h-screen">
        {/* HEADER: two-column on md+, single on mobile */}
        <div className="max-w-7xl mx-auto flex flex-row items-center px-6 py-12 gap-12">
          {/* LEFT: video or image */}
          <div className="w-full md:w-1/2 h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg bg-gray-900">
            {project.mediaType === 'video' ? (
              <video
                src={project.mediaUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={project.mediaUrl}               
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* RIGHT: title, blurb, icon buttons */}
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-5xl font-extrabold">{project.title}</h1>
            <p className="text-lg md:text-xl text-gray-300">{project.shortDesc}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-black rounded-md shadow hover:opacity-90 transition"
              >
                <FaGithub className="mr-2" /> View on GitHub
              </a>
              <a
                href={project.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-transparent border border-white text-white rounded-md hover:bg-white/20 transition"
              >
                <FaGlobe className="mr-2" /> Visit Site
              </a>
            </div>
          </div>
        </div>

        {/* DETAIL SECTIONS */}
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
          {project.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">{sec.heading}</h2>  
              <p className="text-lg md:text-xl">{sec.content}</p>            
              {sec.image && (
                <figure>
                  <img
                    src={sec.image}
                    alt={sec.caption}
                    className="rounded-lg shadow-lg"
                  />
                  {sec.caption && (
                    <figcaption className="text-sm text-gray-400 mt-2">
                      {sec.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </section>
          ))}

          <div className="text-center">
            <Link to="/" className="underline text-blue-400">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
