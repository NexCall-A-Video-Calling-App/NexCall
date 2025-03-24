import React from "react";
import { motion } from "framer-motion";

const GetStarted = () => {
  return (

    <div className="container w-11/12 mx-auto">
      <div className="relative bg-primary rounded-2xl px-4 py-8 sm:px-8 sm:py-12 flex flex-col items-center justify-center text-center max-w-5xl mx-auto overflow-hidden">
        {/* Corner Decorations */}
        <div className="absolute top-0 right-0 w-16 sm:w-24 h-12 sm:h-16 bg-[#a887df] rounded-tr-2xl rounded-bl-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 sm:w-36 h-12 sm:h-16 bg-[#a887df] rounded-bl-2xl rounded-tr-2xl"></div>
        {/* Heading */}
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-lexend">Get started!</h2>
        {/* Description */}
        <p className="text-gray-300 mb-6 max-w-md sm:max-w-lg md:max-w-xl text-sm sm:text-base">
          Utilize digital calendars or scheduling apps to keep track of your appointments,
          deadlines, and events. These tools often offer reminders and can sync across
          multiple devices, ensuring you stay on top of your schedule.
        </p>
        {/* Button */}
        <button className="btn bg-white text-black px-5 py-2 text-sm sm:px-6 sm:text-base">Sign up</button>
        {/* Avatars */}
        <div className="absolute left-4 sm:left-6 top-4 sm:top-6">
          <div className="avatar">
            <div className="w-12 sm:w-16 rounded-full border-2 border-white">
              <img src="https://i.ibb.co.com/yQ6HV8R/r2.jpg" />
            </div>
          </div>
        </div>
        <div className="absolute right-4 sm:right-6 top-16 sm:top-20 hidden sm:block">
          <div className="avatar">
            <div className="w-12 sm:w-16 rounded-full border-2 border-white">
              <img src="https://i.ibb.co.com/105gv6j/r1.jpg" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 sm:bottom-6 left-24 sm:left-40 hidden sm:block">
          <div className="avatar">
            <div className="w-12 sm:w-16 rounded-full border-2 border-white">
              <img src="https://i.ibb.co.com/qjrMBmf/r4.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
