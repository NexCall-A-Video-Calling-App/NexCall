import React from "react";
import { motion } from "framer-motion";

const GetStarted = () => {
  return (
    <div className="bg-purple-600 text-white py-12 px-4 rounded-lg relative overflow-hidden max-w-5xl mx-auto">
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Get started!
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-center text-white/90 mt-4 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Utilize digital calendars or scheduling apps to keep track of your
        appointments, deadlines, and events. Stay updated and organized!
      </motion.p>

      {/* Button */}
      <motion.div
        className="flex justify-center mt-6"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <button className="bg-white btn text-purple-600 font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition">
          Sign up
        </button>
      </motion.div>

      {/* Decorative Floating Avatars */}
      <motion.img
        src="/path-to-avatar1.png"
        alt="User"
        className="w-12 h-12 rounded-full absolute top-4 left-6 shadow-md"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.img
        src="/path-to-avatar2.png"
        alt="User"
        className="w-12 h-12 rounded-full absolute top-6 right-8 shadow-md"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      <motion.img
        src="/path-to-avatar3.png"
        alt="User"
        className="w-10 h-10 rounded-full absolute bottom-6 left-10 shadow-md"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      />
    </div>
  );
};

export default GetStarted;
