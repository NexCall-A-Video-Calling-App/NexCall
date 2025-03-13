import React from "react";
import {
  FaVideo,
  FaLock,
  FaDesktop,
  FaCommentDots,
  FaGlobe,
  FaUsers,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaVideo />,
    title: "High-quality Video & Audio",
    desc: "Crystal-clear HD video and pristine audio quality for the best communication experience.",
  },
  {
    icon: <FaLock />,
    title: "End-to-End Encryption",
    desc: "Your conversations are protected with military-grade encryption technology.",
  },
  {
    icon: <FaDesktop />,
    title: "Screen Sharing",
    desc: "Share your screen instantly for better collaboration and presentations.",
  },
  {
    icon: <FaCommentDots />,
    title: "Real-time Chat",
    desc: "Send messages, share files, and collaborate while on your video call.",
  },
  {
    icon: <FaGlobe />,
    title: "Browser-Based",
    desc: "No downloads required. Start your call directly from your browser.",
  },
  {
    icon: <FaUsers />,
    title: "Group Calls",
    desc: "Host meetings with up to 100 participants with no quality compromise.",
  },
];

const steps = [
  {
    number: "1",
    title: "Create a Room",
    desc: "Click ‘Start Call’ to generate your unique room link instantly.",
  },
  {
    number: "2",
    title: "Share the Link",
    desc: "Send the room link to your team members or friends.",
  },
  {
    number: "3",
    title: "Join & Start Talking",
    desc: "Enter the room and enjoy seamless communication.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Features Section */}
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        // animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Powerful Features for Seamless Communication
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="p-6 border rounded-lg text-center shadow-md hover:shadow-lg transition"
          >
            <div className="text-3xl text-gray-700 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* How It Works Section */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        //    animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-center mt-16 mb-8"
      >
        How It Works
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="p-6 border rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center justify-center">
              <div className="text-3xl font-bold text-purple-600 mb-2 bg-black rounded-full w-10 h-10">
                {step.number}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
