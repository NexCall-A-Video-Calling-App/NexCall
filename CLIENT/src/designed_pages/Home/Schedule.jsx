import React from "react";
import { motion } from "framer-motion";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegShareSquare } from "react-icons/fa";

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

const Schedule = () => {
  return (
    <div className="container mx-auto pb-12 px-4 w-full overflow-hidden">
      {/* Right Section - Lottie Animation */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <AnimatedSection x={-50}>
          <h2 className="text-4xl font-bold text-gray-900">
            <span className="text-primary">Smarter</span> scheduling for<br /> your work
          </h2>
          <p className="text-xl font-light text-[#9095A0] mt-3">
            Smarter scheduling for work involves employing<br /> effective strategies.
          </p>
          <motion.button
            className="mt-4 bg-[#f6f3fc] btn text-primary py-2 px-5 rounded-md hover:bg-primary hover:text-white transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn more
          </motion.button>
        </AnimatedSection>

        <div className="relative flex items-center justify-center p-8 bg-white">
          {/* Background Dots */}
          <img
            src="https://i.ibb.co.com/kYHR46Y/Image-72-1.png"
            alt="Background Dots"
            className="absolute w-64 left-16"
          />

          {/* Schedule Card */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative border border-blue-500 -top-28 left-16 z-10 bg-white rounded-2xl shadow-xl p-3 flex flex-col gap-4 w-72"
          >
            <div className="flex justify-center items-center">
              <h1 className="badge border-primary p-3 text-center">Schedule</h1>
            </div>
            <div className="space-y-4">
              {/* Meeting Item */}
              <div className="flex items-center justify-between bg-purple-600 rounded-lg p-3">
                <span className="text-sm font-semibold text-white">11:00 AM</span>
                <span className="text-sm font-medium text-white">Weekly Meeting</span>
              </div>

              {/* Review Item */}
              <div className="flex items-center justify-between bg-[#ff7f00] rounded-lg p-3">
                <span className="text-sm font-semibold text-white">03:00 PM</span>
                <span className="text-sm font-medium text-white">Monthly Review</span>
              </div>
            </div>
          </motion.div>

          {/* Boy Illustration */}
          <motion.div
            initial={{ opacity: 1, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://i.ibb.co.com/6cpJTNTJ/Image-72.png"
              alt="Boy Illustration"
              className="relative z-20 ml-6"
            />
          </motion.div>

          {/* Check Icon */}
          <div className="absolute right-8 top-12 ">
            <CiCircleCheck className="text-5xl text-primary" />
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center mt-12">
        <div className="relative flex items-center justify-center p-8 bg-white">
          <div className="w-4/12 ">
            <motion.img
              src="https://i.ibb.co.com/nNtKkJNL/Image-73.png"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            />
          </div>
          <div className="w-8/12 relative bg_dot h-60">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white shadow-2xl -ml-16 p-2 py-4 w-8/12 rounded-md absolute bottom-9">
              <h1 className="font-bold mb-2">Share with everyone</h1>
              <div className="flex gap-2">
                <div className="p-2 rounded-md flex justify-between text-sm bg-purple-200 items-center w-40">
                  <p className="underline">Link.com</p>
                  <p >Copy Link</p>
                </div>
                <button className="btn">Share</button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Left Section */}
        <AnimatedSection x={50}>
          <h2 className="text-4xl font-bold text-gray-900">
            <span className="text-primary">Share</span> your Schedule<br /> with everyone
          </h2>
          <p className="text-xl font-light text-[#9095A0] mt-3">
            Smarter scheduling for work involves employing<br /> effective strategies.
          </p>
          <motion.button
            className="mt-4 bg-[#f6f3fc] btn text-primary py-2 px-5 rounded-md hover:bg-primary hover:text-white transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn more
          </motion.button>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Schedule;
