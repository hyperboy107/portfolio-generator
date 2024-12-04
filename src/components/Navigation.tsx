import React from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const sections = ['About', 'Technologies', 'Experience', 'Projects', 'Contact'];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm z-50"
    >
      <div className="max-w-4xl mx-auto px-6 py-4">
        <ul className="flex justify-center space-x-8">
          {sections.map((section) => (
            <motion.li
              key={section}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`#${section.toLowerCase()}`}
                className="text-gray-300 hover:text-violet-400 transition-colors"
              >
                {section}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}