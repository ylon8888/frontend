"use client";

import { T_FaqItem } from "@/types/Common";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FaqItem = ({
  item,
  isOpen,
  toggleAccordion,
}: {
  item: T_FaqItem;
  isOpen: boolean;
  toggleAccordion: () => void;
}) => {
  return (
    <div className="relative bg-[#FAFAFA] p-6 rounded-sm">
      {/* Diagonal line decoration */}
      <div className="absolute -bottom-6 -right-6 w-12 h-12 opacity-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="100" x2="100" y2="0" stroke="#000" strokeWidth="1" />
        </svg>
      </div>

      <button
        className="flex w-full justify-between items-start text-left focus:outline-none group"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        <h3 className="font-montserrat text-lg font-medium text-gray-900 pr-8">
          {item.question}
        </h3>
        <span className="flex-shrink-0 mt-1">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 text-base text-gray-600 font-montserrat">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
