// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home        from './pages/Home'
import ProjectPage from './pages/ProjectPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="*" element={<div className="p-8">Page Not Found</div>} />
    </Routes>
  )
}
