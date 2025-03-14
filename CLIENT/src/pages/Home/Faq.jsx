import React, { useState } from "react";
import { motion } from "framer-motion";
import faqIllustration from "../../assets/Faq.json";
import Lottie from "lottie-react";

const faqs = [
  {
    question: "What is a schedule tool, and how does it work?",
    answer:
      "A scheduling tool helps you manage appointments and meetings efficiently by allowing easy booking and reminders.",
  },
  {
    question: "Can I sync the schedule tool with my existing calendar?",
    answer:
      "Yes, many scheduling tools offer integration with Google Calendar, Outlook, and Apple Calendar, allowing seamless syncing across devices.",
  },
  {
    question: "Can I share my schedule with others?",
    answer:
      "Yes, scheduling tools often provide sharing options so you can allow others to view or book available slots.",
  },
  {
    question: "Is my data safe and secure within the schedule tool?",
    answer:
      "Absolutely! Most scheduling tools have end-to-end encryption and robust security measures to keep your data private.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="grid md:grid-cols-2 gap-10 items-center bg-white shadow-lg rounded-lg p-6">
        {/* Left Side: Illustration Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block"
        >
          <Lottie
            animationData={faqIllustration}
            loop
            className="w-full h-auto"
          />
        </motion.div>

        {/* Right Side: FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">FAQ?</h2>

          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-4 px-3 flex justify-between items-center text-lg font-medium text-gray-800 hover:text-purple-600"
              >
                {faq.question}
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden px-4"
              >
                <p className="text-gray-600 py-2">{faq.answer}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
