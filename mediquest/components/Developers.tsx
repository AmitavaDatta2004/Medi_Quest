"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // ✅ Import Next.js Image component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin } from "lucide-react";

const developers = [
  {
    name: "Amitava Datta",
    role: "Backend Developer",
    image: "/AmitavaDatta.jpg",
    gradient: "from-blue-500 to-cyan-500",
    github: "https://github.com/AmitavaDatta2004"
  },
  {
    name: "Pranay De",
    role: "ML Engineer",
    image: "/PranayDe.jpg",
    gradient: "from-purple-500 to-pink-500",
    github: "https://github.com/PRANAY130"
  },
  // {
  //   name: "Aitijhya Roy",
  //   role: "UI UX Designer",
  //   image: "/AitijhyaRoy.jpg",
  //   gradient: "from-green-500 to-emerald-500",
  //   github: "https://github.com/AitijhyaCoded"
  // },
  // {
  //   name: "Rudranil Das",
  //   role: "Frontend Developer",
  //   image: "/RudranilDas.jpg",
  //   gradient: "from-orange-500 to-red-500",
  //   github: "https://github.com/Thorfinn05"
  // },
];

export default function Developers() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-background/50 to-background" id="team">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dedicated developers working together to revolutionize healthcare technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((developer, index) => (
            <motion.div
              key={developer.name} // ✅ Using developer's name as a key instead of index (better for React)
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="team-card border-none bg-gradient-to-br from-background to-muted">
                <CardHeader>
                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${developer.gradient} rounded-full blur-lg opacity-50`} />
                    <div className="relative w-full h-full overflow-hidden rounded-full ring-4 ring-background">
                      <Image
                        src={developer.image}
                        alt={developer.name}
                        width={160} // ✅ Provide width
                        height={160} // ✅ Provide height
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        priority // ✅ Optimize loading
                      />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{developer.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground mb-6">{developer.role}</p>
                  <div className="flex justify-center space-x-6">
                    <a href={developer.github} className="social-icon">
                      <Github className="h-6 w-6" />
                    </a>
                    <a href="#" className="social-icon">
                      <Linkedin className="h-6 w-6" />
                    </a>
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
