import React from "react";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-8 px-4">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section: Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">📅</span> Appointopia
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Say hello to Appointopia, the innovative schedule app designed to simplify your life and make scheduling a breeze!
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 text-gray-700">
            <FaTwitter className="cursor-pointer hover:text-blue-500" />
            <FaFacebookF className="cursor-pointer hover:text-blue-700" />
            <FaLinkedinIn className="cursor-pointer hover:text-blue-600" />
            <FaYoutube className="cursor-pointer hover:text-red-500" />
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Product</h3>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li className="hover:text-purple-600 cursor-pointer">Features</li>
            <li className="hover:text-purple-600 cursor-pointer">Pricing</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Resource</h3>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li className="hover:text-purple-600 cursor-pointer">Blog</li>
            <li className="hover:text-purple-600 cursor-pointer">User Guides</li>
            <li className="hover:text-purple-600 cursor-pointer">Webinars</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">About Us</h3>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li className="hover:text-purple-600 cursor-pointer">About us</li>
            <li className="hover:text-purple-600 cursor-pointer">Contact us</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm border-t pt-4">
        <p>© 2022 Brand, Inc.</p>
        <ul className="flex space-x-4 mt-2 md:mt-0">
          <li className="hover:text-purple-600 cursor-pointer">Privacy</li>
          <li className="hover:text-purple-600 cursor-pointer">Terms</li>
          <li className="hover:text-purple-600 cursor-pointer">Sitemap</li>
        </ul>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
