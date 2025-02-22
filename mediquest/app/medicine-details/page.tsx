"use client";

import { MedicineSearch } from '@/components/medicine-search';
import { Background } from '@/components/background1';
import { Features } from '@/components/features1';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Background />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4">
            <TypeAnimation
              sequence={[
                'Medicine Information Portal',
                2000,
                'Your Health Companion',
                2000,
                'Find Medicine Details',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Get detailed information about any medicine instantly
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <MedicineSearch />
        </motion.div>
        <Features />
      </div>
    </main>
  );
}