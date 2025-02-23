"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Import the Image component
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return null;
  }

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg dark:shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between h-20"
          initial="hidden"
          animate="visible"
          variants={navVariants}
        >
          <motion.div className="flex items-center" variants={itemVariants}>
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/logo-mediquest.png" // Ensure the image is in the public folder
                  alt="logo"
                  width={64} // Set the width
                  height={64} // Set the height
                  className="h-16 transition-transform duration-300 hover:rotate-6 hover:scale-105"
                />
              </motion.div>
              <span className="text-2xl font-bold gradient-text">
                MediQuest
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {[
              "Features",
              "Report Analyzer",
              "Disease Predictor",
              "Medicine Details",
              "Team",
            ].map((item) => (
              <motion.div
                key={item}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Link
                  href={
                    item === "Features" || item === "Team"
                      ? `#${item.toLowerCase()}`
                      : `/${item.toLowerCase().replace(" ", "-")}`
                  }
                  className="nav-link text-lg"
                >
                  {item}
                </Link>
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </motion.div>
            ))}
            <motion.div variants={itemVariants}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative group"
              >
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button className="rounded-full px-8 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient hover:scale-105 transition-transform duration-300">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </Button>
            </motion.div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <motion.div variants={itemVariants}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="transition-transform duration-300 hover:scale-110"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
            <motion.button
              variants={itemVariants}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <div className="px-4 pt-2 pb-6 space-y-3 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl border-t border-border/50">
              {[
                "Features",
                "Report Analyzer",
                "Disease Predictor",
                "Medicine Details",
                "Team",
              ].map((item) => (
                <motion.div
                  key={item}
                  variants={itemVariants}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="relative group"
                >
                  <Link
                    href={
                      item === "Features" || item === "Team"
                        ? `#${item.toLowerCase()}`
                        : `/${item.toLowerCase().replace(" ", "-")}`
                    }
                    className="block px-3 py-2 text-lg nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <Button
                  className="w-full rounded-full mt-4 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient"
                  onClick={() => setIsOpen(false)}
                >
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}