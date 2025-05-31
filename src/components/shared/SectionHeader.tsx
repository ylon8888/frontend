"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  textColor?: string; // New prop for text color
}

const SectionHeader = ({
  badge,
  title,
  subtitle,
  centered = false,
  className = "",
  textColor = "text-black",
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`max-w-5xl ${
        centered ? "mx-auto text-center" : ""
      } ${className}`}
    >
      {badge && (
        <div className={`text-xl font-montserrat mb-10 ${textColor}`}>
          <span className="text-xl">🎓</span>
          <span className="uppercase tracking-wider">{badge}</span>
        </div>
      )}
      <h2
        className={`text-3xl font-semibold tracking-tight md:text-3xl lg:text-5xl mb-8 font-montserrat ${textColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`font-normal max-w-4xl mx-auto ${textColor}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
