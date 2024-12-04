import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PortfolioForm from './components/PortfolioForm';
import Portfolio from './components/Portfolio';
import { PortfolioData } from './types/Portfolio';
import { generateFiles } from './utils/generateFiles';

function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  const handleSubmit = (data: PortfolioData) => {
    setPortfolioData(data);
    generateFiles(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto py-8"
      >
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
        </h1>
        
        {!portfolioData ? (
          <PortfolioForm onSubmit={handleSubmit} />
        ) : (
          <Portfolio data={portfolioData} />
        )}
      </motion.div>
    </div>
  );
}

export default App;