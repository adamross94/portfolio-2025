// src/components/Contact.jsx
import React from 'react';

const Contact = () => (
  <section id="contact" className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h3 className="text-3xl font-bold mb-4">Contact</h3>
      <p className="text-gray-700 mb-6">Feel free to reach out to me via email at <a href="mailto:your.email@example.com" className="text-blue-500 hover:underline">your.email@example.com</a>.</p>
      {/* You can also include a contact form here */}
    </div>
  </section>
);

export default Contact;
