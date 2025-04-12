import React from "react";
import { motion } from "framer-motion";
import banner from "../../assets/banner.png";
import dot from "../../assets/dot.png"
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
    <div id="banner" className="container mx-auto flex flex-col items-center text-center pt-8 px-4">
      {/* Animated Heading */}
      <motion.h1
        className="text-xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-lexend leading-[1.4]"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Crystal-Clear Video Calls, <br />{" "}
        <motion.span className="text-primary" variants={scaleVariants} initial="hidden" animate="visible">
          Anytime, Anywhere!
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
      <motion.div
        className="mt-6 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background dot image - lower z-index */}
        <motion.img
          src={dot}
          className="absolute right-0 top-[45%] z-10 w-5/12 h-6/12"
          alt=""
          aria-hidden="true"
        />

        {/* Foreground banner image - higher z-index */}
        <motion.img
          src={banner}
          className="z-20 relative"  // Ensure it's positioned relative for z-index to work
          alt="Video Call Preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </motion.div>
    </div>
  );
};

export default Banner;
