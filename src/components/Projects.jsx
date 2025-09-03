// src/components/Projects.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>

        <div className="space-y-16">
          {projects.map((project, i) => {
            // alternate left/right on odd items
            const containerOrder = i % 2 === 1 ? 'flex-row-reverse' : 'flex-row'

            return (
              <div
                key={project.slug}
                className={`flex ${containerOrder} items-center px-4 py-12 gap-12`}
              >
                {/* MEDIA SIDE */}
                <div className="flex-1 h-64 lg:h-80 overflow-hidden rounded-lg shadow-lg bg-gray-900">
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

                {/* TEXT SIDE */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-3xl py-2 font-bold">{project.title}</h3>
                  <p className="text-lg py-2 text-gray-300">{project.shortDesc}</p>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center text-white font-medium hover:underline"
                  >
                    View Project →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
