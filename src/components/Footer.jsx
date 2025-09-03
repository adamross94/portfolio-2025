// src/components/Footer.jsx
import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-6">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          LinkedIn
        </a>
        <a
          href="mailto:your.email@example.com"
          className="hover:text-gray-400"
        >
          Email
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
