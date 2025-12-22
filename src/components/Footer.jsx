// src/components/Footer.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  const shell = isDark
    ? 'bg-gray-900 text-white border-white/10'
    : 'bg-emerald-50 text-emerald-900 border-emerald-100/80';
  const linkColor = isDark
    ? 'text-gray-300 hover:text-white'
    : 'text-emerald-700 hover:text-emerald-900';

  return (
    <footer className={`${shell} py-6 border-t`}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-4 text-sm font-medium">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className={linkColor}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className={linkColor}
          >
            LinkedIn
          </a>
          <a href="mailto:your.email@example.com" className={linkColor}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
