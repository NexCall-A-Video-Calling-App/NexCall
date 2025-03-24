import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    // <div className="bg-purple-600 text-white py-12 px-4 rounded-lg relative overflow-hidden max-w-5xl mx-auto">
    //   {/* Heading */}
    //   <motion.h2
    //     className="text-3xl md:text-4xl font-bold text-center font-lexend"
    //     initial={{ opacity: 0, y: -20 }}
    //     whileInView={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.8 }}
    //   >
    //     Get started!
    //   </motion.h2>

    //   {/* Description */}
    //   <motion.p
    //     className="text-center text-white/90 mt-4 max-w-2xl mx-auto"
    //     initial={{ opacity: 0 }}
    //     whileInView={{ opacity: 1 }}
    //     transition={{ duration: 1, delay: 0.3 }}
    //   >
    //     Utilize digital calendars or scheduling apps to keep track of your
    //     appointments, deadlines, and events. Stay updated and organized!
    //   </motion.p>

    //   {/* Button */}
    //   <motion.div
    //     className="flex justify-center mt-6"
    //     initial={{ opacity: 0, scale: 0.8 }}
    //     whileInView={{ opacity: 1, scale: 1 }}
    //     transition={{ duration: 0.5, delay: 0.5 }}
    //   >
    //     <Link to={'/sign-up'} className="bg-white btn text-purple-600 font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition">
    //       Sign up
    //     </Link>
    //   </motion.div>

    //   {/* Decorative Floating Avatars */}
    //   <motion.img
    //     src="https://i.ibb.co.com/yQ6HV8R/r2.jpg"
    //     alt="User"
    //     className="w-14 h-14 rounded-full absolute top-4 left-6 shadow-md"
    //     initial={{ opacity: 0, scale: 0.5 }}
    //     animate={{ opacity: 1, scale: 1 }}
    //     transition={{ duration: 0.8, delay: 0.3 }}
    //   />
    //   <motion.img
    //     src="https://i.ibb.co.com/105gv6j/r1.jpg"
    //     alt="User"
    //     className="w-14 h-14 rounded-full absolute top-6 right-8 shadow-md"
    //     initial={{ opacity: 0, scale: 0.5 }}
    //     animate={{ opacity: 1, scale: 1 }}
    //     transition={{ duration: 0.8, delay: 0.6 }}
    //   />
    //   <motion.img
    //     src="https://i.ibb.co.com/qjrMBmf/r4.jpg"
    //     alt="User"
    //     className="w-12 h-12 rounded-full absolute bottom-6 left-10 shadow-md"
    //     initial={{ opacity: 0, scale: 0.5 }}
    //     animate={{ opacity: 1, scale: 1 }}
    //     transition={{ duration: 0.8, delay: 0.9 }}
    //   />
    // </div>
    <div className="bg-primary relative rounded-2xl p-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">

      {/* Top Left & Right Corner Decorations */}
      <div className="absolute top-0 right-0 w-24 h-16 bg-[#a887df] rounded-tr-2xl rounded-bl-2xl"></div>
      <div className="absolute bottom-0 left-0 w-36 h-16 bg-[#a887df] rounded-bl-2xl rounded-tr-2xl"></div>

      {/* Heading */}
      <h2 className="text-white text-3xl font-bold mb-4 font-lexend">Get started!</h2>

      {/* Description */}
      <p className="text-gray-300 mb-6 max-w-xl">
        Utilize digital calendars or scheduling apps to keep track of your appointments,
        deadlines, and events. These tools often offer reminders and can sync across
        multiple devices, ensuring you stay on top of your schedule.
      </p>

      {/* Button */}
      <button className="btn bg-white text-black px-6">Sign up</button>

      {/* Avatars */}
      <div className="absolute left-6 top-6">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src="https://i.ibb.co.com/yQ6HV8R/r2.jpg" />
          </div>
        </div>
      </div>

      <div className="absolute right-6 top-20">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src="https://i.ibb.co.com/105gv6j/r1.jpg" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-40">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src="https://i.ibb.co.com/qjrMBmf/r4.jpg" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default GetStarted;
