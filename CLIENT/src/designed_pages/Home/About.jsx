import React from "react";
import { motion } from "framer-motion";
import aboutNexImg from '../../assets/aboutNex.png'

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center overflow-hidden">
      {/* Left Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 text-center md:text-left"
      >
        <h2 className="text-3xl font-bold text-gray-900">
          About <span className="text-primary">NexCall</span>
        </h2>
        <p className="text-gray-600 mt-4 leading-relaxed">
          We're on a mission to make communication effortless. Since our
          founding in 2021, NexCall has quickly become the go-to platform
          for professional, reliable, and secure video conferencing solutions.
        </p>

        {/* Stats */}
        <div className="flex gap-8 mt-6 justify-center md:justify-start">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">2M+</h3>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">150+</h3>
            <p className="text-gray-600">Countries</p>
          </div>
        </div>
      </motion.div>

      {/* Right Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 mt-10 md:mt-0"
      >
        <img
          src={aboutNexImg}
          alt="About NexCall" 
        />
      </motion.div>
    </div>
  );
};

export default About;
