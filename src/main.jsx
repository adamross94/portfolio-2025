import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

// Initialize theme based on localStorage or system preference
const storedTheme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const useDark = storedTheme === 'dark' || (!storedTheme && prefersDark)
const root = document.documentElement
const body = document.body
root.classList.remove('light', 'dark')
body.classList.remove('light', 'dark')
const next = useDark ? 'dark' : 'light'
root.classList.add(next)
body.classList.add(next)

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </ThemeProvider>,
)
