import React from "react";
import { motion } from "framer-motion";
import banner from "../../assets/banner.png";

// 🔹 Variants for Animations
const textVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};

const scaleVariants = {
  hidden: { scale: 0.8 },
  visible: {
    scale: 1,
    transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror" },
  },
};

const Banner = () => {
  return (
    <div className="container mx-auto flex flex-col items-center text-center py-12 px-4">
      {/* Animated Heading */}
      <motion.h1
        className="text-4xl font-bold text-gray-900"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Crystal-Clear Video Calls, Anytime,{" "}
        <motion.span className="text-purple-600" variants={scaleVariants} initial="hidden" animate="visible">
          Anywhere!
        </motion.span>
      </motion.h1>

      {/* Animated Paragraph */}
      <motion.p
        className="text-gray-600 mt-4 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Experience seamless, secure, and high-quality video calls with NextCall
        – fast, reliable, and private communication anytime, anywhere.
      </motion.p>

      {/* Button with Animation */}
      <motion.button
        className="mt-6 bg-purple-600 text-white py-2 px-6 rounded-lg text-lg shadow-md hover:bg-purple-700 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Get started
      </motion.button>

      {/* Animated Image */}
      <motion.div className="mt-6 relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.img
          src={banner}
          alt="Video Call Preview"
          className="rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
        />
      </motion.div>
    </div>
  );
};

export default Banner;
