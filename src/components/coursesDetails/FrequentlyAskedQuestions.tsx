"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQ[];
}

const FrequentlyAskedQuestions = ({ faqs }: FAQProps) => {
  return (
    <div className="lg:p-6">
      <motion.h2
        className="text-3xl font-montserrat font-semibold mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Frequently Ask Questions
      </motion.h2>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="px-4 py-6 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors data-[state=open]:bg-orange-50 data-[state=open]:text-secondary font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1 text-gray-600">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  );
};

export default FrequentlyAskedQuestions;
