import React from "react";
import { motion } from "framer-motion";
import scheduleAnimation from "../../assets/schedule_1.json";
import Lottie from "lottie-react";

// 🔹 Reusable Motion Wrapper Component
const AnimatedSection = ({ children, x }) => (
  <motion.div
    initial={{ opacity: 0, x }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 0.7 }}
    className="text-left"
  >
    {children}
  </motion.div>
);

// 🔹 Lottie Animation Component
const ScheduleAnimation = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 0.7 }}
  >
    <Lottie animationData={scheduleAnimation} loop className="w-full h-auto" />
  </motion.div>
);

const Schedule = () => {
  return (
    <div className="container mx-auto pb-12 px-4 w-full">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <AnimatedSection x={-50}>
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-purple-600">Smarter</span> scheduling for your work
          </h2>
          <p className="text-gray-600 mt-3">
            Smarter scheduling for work involves employing effective strategies.
          </p>
          <motion.button
            className="mt-4 bg-purple-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-purple-700 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Learn more
          </motion.button>
        </AnimatedSection>

        {/* Right Section - Lottie Animation */}
        <ScheduleAnimation />
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center mt-16">
        {/* Left Section - Lottie Animation */}
        <ScheduleAnimation />

        {/* Right Section */}
        <AnimatedSection x={-30}>
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-purple-600">Share</span> your schedule with everyone
          </h2>
          <p className="text-gray-600 mt-3">
            Sharing the event schedule allows attendees to be well-informed about the event's agenda, timing.
          </p>
          <motion.button
            className="mt-4 bg-purple-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-purple-700 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Learn more
          </motion.button>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Schedule;
