"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Sample courses for dropdown
  // const courses = [
  //   { name: "Web Development", href: "#" },
  //   { name: "Data Science", href: "#" },
  //   { name: "Mobile Development", href: "#" },
  //   { name: "UI/UX Design", href: "/asdasd" },
  // ];

  // Navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <nav className="bg-[#1e2130] text-white py-8 px-4 md:px-8">
      <div className="container max-w-[1320px] mx-auto flex items-center justify-between">
        {/* Mobile Menu Button (shifted to the left) */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="space-y-1.5">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="text-white font-bold text-2xl md:text-3xl">
            LOGO
            <span className="inline-block w-2 h-2 bg-secondary rounded-full ml-1 align-top mt-2"></span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-14">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-white hover:text-secondary font-montserrat transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* <div className="relative">
            <div className="flex items-center">
              <Link href="/courses" className="text-white hover:text-secondary">
                Courses
              </Link>
              <button
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                onBlur={() => setTimeout(() => setIsCoursesOpen(false), 100)}
                className="ml-1 text-white hover:text-secondary"
              >
                {" "}
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

            <AnimatePresence>
              {isCoursesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-20 mt-2 w-48 rounded-md bg-white shadow-lg"
                >
                  <div className="py-1">
                    {courses.map((course, index) => (
                      <Link
                        key={index}
                        href={course.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {course.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div> */}
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 left-0 right-0 bg-[#1e2130] z-20 md:hidden"
            >
              <div className="flex flex-col p-4 space-y-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-white hover:text-secondary font-montserrat transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                <Link
                  href="/login"
                  className="bg-secondary hover:bg-orange-600 text-white py-2 px-4 rounded-md text-center transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and Login */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="bg-teal-600 hover:bg-teal-700 transition-colors p-2 rounded-full flex items-center justify-center"
            >
              <Search className="h-5 w-5" />
            </button>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "250px" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 top-0 flex items-center"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    className="w-full py-2 px-4 pr-10 rounded-l-md text-black focus:outline-none bg-white"
                  />
                  <button
                    className="bg-teal-600 hover:bg-teal-700 transition-colors p-2 rounded-r-md"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/login"
            className="bg-secondary hover:bg-orange-600 text-white py-2 px-6 rounded-md transition-colors"
          >
            Login Now
          </Link>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="bg-teal-600 hover:bg-teal-700 transition-colors p-2 rounded-full flex items-center justify-center mr-2"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-4 pt-4"
          >
            <div className="flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-4 rounded-l-md text-black focus:outline-none bg-white"
              />
              <button
                className="bg-teal-600 hover:bg-teal-700 transition-colors p-2 rounded-r-md"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
