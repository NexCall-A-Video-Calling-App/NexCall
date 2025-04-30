import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import { MdOutlineVoiceChat } from "react-icons/md";
import toast from "react-hot-toast";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { user, userLogOut } = useAuth();
  // console.log(user)

  const handleLogout = async () => {
    try {
      userLogOut();
      toast.success('Logged out successfully.');
    } catch {
      toast.error('Logout failed. Please try again.');
    }
  }

  const links = (
    <>
      <li className="text-gray-300">
        <a href="#banner">Home</a>
      </li>
      <li className="text-gray-300">
        <a href="#about">About Us</a>
      </li>
      <li className="text-gray-300">
        <a href="#features">Features</a>
      </li>
      <li className="text-gray-300">
        <a href="#faq">FAQ</a>
      </li>
      <li className="text-gray-300">
        <a href="#pricing-plans">Pricing Plans</a>
      </li>
    </>
  );

  return (
    <div className="bg-[#151515] shadow-sm w-full fixed top-0 z-50">
      <div className="container mx-auto navbar px-2">
        {/* Mobile menu (left side on small devices) */}
        <div className="navbar-start lg:hidden">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-44 p-2 shadow"
            >
              {links}
            </ul>
          </div>
        </div>

        {/* Logo: always on the left */}
        <div className="navbar-start hidden lg:flex">
          <Link to="/" className="flex items-center font-semibold text-2xl">
            <img className="w-6 h-6 object-cover mr-2" src={logo} alt="NexCall Logo" />
            <div className="text-2xl font-bold bg-gradient-to-r from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent">
              NexCall
            </div>
          </Link>
        </div>

        {/* Center links for large screens */}
        <div className="hidden lg:flex lg:mx-auto">
          <ul className="menu menu-horizontal px-1 text-base flex-nowrap">{links}</ul>
        </div>

        {/* Show logo in center for small devices */}
        <div className="navbar-center lg:hidden">
          <Link to="/" className="flex items-center font-semibold text-2xl -ml-5">
            <img className="w-8 h-8 object-cover mr-2" src={logo} alt="NexCall Logo" />
            <div className="text-2xl font-bold bg-gradient-to-r from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent">
              NexCall
            </div>
          </Link>
        </div>

        {/* User menu */}
        <div className="navbar-end">
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
