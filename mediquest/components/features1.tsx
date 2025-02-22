"use client";

import { motion } from "framer-motion";
import { 
  Pill, 
  FileSearch, 
  AlertCircle, 
  Replace, 
  Download, 
  Star 
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Comprehensive Information",
    description: "Detailed data about composition, dosage, and usage guidelines for medications",
  },
  {
    icon: AlertCircle,
    title: "Safety Alerts",
    description: "Important warnings about side effects and potential drug interactions",
  },
  {
    icon: Replace,
    title: "Alternative Options",
    description: "Find suitable substitutes and generic alternatives for medications",
  },
  {
    icon: Download,
    title: "PDF Reports",
    description: "Download detailed medicine information in PDF format for offline reference",
  },
  {
    icon: Star,
    title: "User Reviews",
    description: "Access real user experiences and ratings for medications",
  },
  {
    icon: Pill,
    title: "Storage Guidelines",
    description: "Proper storage conditions and expiry information for medicines",
  },
];

export function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4">
          Powerful Features
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Everything you need to make informed decisions about medications
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg p-2.5 mb-4">
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
            <div className="absolute inset-0 border border-blue-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}