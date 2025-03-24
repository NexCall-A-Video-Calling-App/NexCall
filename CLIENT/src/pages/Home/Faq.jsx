import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is a schedule tool, and how does it work?",
    answer:
      "A scheduling tool helps you manage appointments and meetings efficiently by allowing easy booking and reminders.",
  },
  {
    question: "Can I sync the schedule tool with my existing calendar?",
    answer:
      "Yes, many schedule tools offer integration with popular calendar apps like Google Calendar, Outlook, or Apple Calendar. This allows users to sync their schedules across different devices and stay up-to-date with their commitments.",
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
  const [openIndex, setOpenIndex] = useState(1); // 2nd open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-col md:grid lg:grid-cols-2 gap-10 items-center">

        {/* Left Illustration with background */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative hidden lg:flex justify-center w-full"
        >
          {/* Background block */}
          <div
            id="parent-Block"
            className="absolute bottom-5 left-5 sm:left-14 w-64 sm:w-80 md:w-96 h-52 sm:h-72 md:h-80 bg-gray-200 rounded-t-2xl z-10"
          >
            {/* Small extra block */}
            <div className="w-20 sm:w-28 h-16 sm:h-24 bg-blue-700 absolute right-0 bottom-0 z-0 rounded-tl-2xl hidden sm:block"></div>
          </div>

          {/* Illustration */}
          <img
            src="https://i.ibb.co/ZpXnnfXH/Image-68-1.png"
            alt="FAQ Illustration"
            className="relative z-20 w-40 sm:w-56 md:w-72"
          />
        </motion.div>

        {/* Right Side FAQ */}
        <div className="w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center md:text-left">FAQ?</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left py-4 px-4 sm:px-5 flex justify-between items-center text-base sm:text-lg font-semibold text-gray-800"
                >
                  {faq.question}
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-500"
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
                  className="overflow-hidden px-4 sm:px-5 bg-gray-50"
                >
                  <p className="text-gray-600 py-4 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
