"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "This platform has revolutionized how I understand my medical reports. The AI analysis is incredibly accurate and helpful.",
    author: "Sarah Johnson",
    role: "Patient",
  },
  {
    quote: "As a healthcare provider, I'm impressed by the accuracy of the disease prediction system. It helps patients seek timely medical attention.",
    author: "Dr. Michael Chen",
    role: "Cardiologist",
  },
  {
    quote: "The medicine information system is comprehensive and easy to understand. It's become my go-to resource for medication details.",
    author: "Robert Wilson",
    role: "Pharmacist",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from healthcare professionals and patients who have experienced the power of our platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Quote className="h-8 w-8 text-primary mb-4" />
                </CardHeader>
                <CardContent>
                  <p className="mb-4 italic">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}