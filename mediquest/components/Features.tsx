"use client";

import { motion } from "framer-motion";
// import { FileSearch, Brain, Pill, Stethoscope, Clock, Shield, UserCog, HeartPulse, Microscope, Syringe, Activity } from "lucide-react";
import { FileSearch, Brain, Pill, Stethoscope, Clock, UserCog, Microscope, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "AI-powered Report Analysis",
    icon: FileSearch,
    description: "Get instant insights from your medical reports with advanced AI analysis",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Disease Prediction",
    icon: Brain,
    description: "Early detection through symptom analysis using machine learning",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Medicine Information",
    icon: Pill,
    description: "Comprehensive details about medications and their effects",
    gradient: "from-green-500 to-emerald-500"
  },
  // {
  //   title: "24/7 Health Monitoring",
  //   icon: Activity,
  //   description: "Continuous tracking of vital health parameters",
  //   gradient: "from-red-500 to-orange-500"
  // },
  // {
  //   title: "Emergency Response",
  //   icon: HeartPulse,
  //   description: "Quick access to emergency services and first-aid guidance",
  //   gradient: "from-yellow-500 to-amber-500"
  // },
  {
    title: "Lab Results Interpretation",
    icon: Microscope,
    description: "Easy-to-understand explanations of laboratory results",
    gradient: "from-indigo-500 to-violet-500"
  },
  // {
  //   title: "Vaccination Tracker",
  //   icon: Syringe,
  //   description: "Keep track of immunization schedules and records",
  //   gradient: "from-teal-500 to-cyan-500"
  // },
  {
    title: "Real-time Health Alerts",
    icon: Clock,
    description: "Timely notifications for medications and appointments",
    gradient: "from-fuchsia-500 to-pink-500"
  },
  // {
  //   title: "Secure Health Records",
  //   icon: Shield,
  //   description: "Encrypted storage of all your medical information",
  //   gradient: "from-blue-500 to-indigo-500"
  // },
  {
    title: "Personalized Health Plans",
    icon: UserCog,
    description: "Custom healthcare recommendations based on your profile",
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    title: "Doctor Consultations",
    icon: Stethoscope,
    description: "Connect with healthcare professionals remotely",
    gradient: "from-emerald-500 to-green-500"
  },
  {
    title: "Health Analytics",
    icon: Activity,
    description: "Detailed analysis of your health trends and patterns",
    gradient: "from-rose-500 to-red-500"
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-background/50 to-background" id="features">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Features</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive healthcare solutions powered by artificial intelligence, making medical information accessible and understandable for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="feature-card h-full border-none bg-gradient-to-br from-background to-muted">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient}`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}