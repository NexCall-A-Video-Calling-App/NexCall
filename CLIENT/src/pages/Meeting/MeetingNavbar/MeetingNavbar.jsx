import React from "react";
import { IoMdHome } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdContactMail } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { Link, NavLink } from "react-router-dom";
import UserMenu from "../../../components/UserMenu";
import logo from "../../../assets/nclogo.png";

function MeetingNavbar() {

  const baseStyle = "md:flex lg:flex-col md:gap-2 lg:gap-0 font-semibold";

  const links = (
    <div className="md:flex text-black">
      <li>
        <NavLink to={'/meeting'} className="md:flex md:flex-col  md:gap-0  font-semibold">
          Home <IoMdHome />
        </NavLink>
      </li>

      <li>
        <NavLink to={'/meeting/chat-history'} className="md:flex md:flex-col  md:gap-0 font-semibold">
          Chat History <IoChatboxEllipses />
        </NavLink>
      </li>

      <li>
        <NavLink className="md:flex md:flex-col  md:gap-0 font-semibold">
          Meeting <SiGoogleclassroom />
        </NavLink>
      </li>

      <li>
        <NavLink className="md:flex md:flex-col  md:gap-0 font-semibold">
          Contact <MdContactMail />
        </NavLink>
      </li> 
    </div>
  );

  return (
    <div className="bg-base-100 shadow-sm w-full fixed top-0 z-50 border-b">
      
      <div className="container mx-auto navbar px-2">
        {/* Mobile menu (left side on small devices) */}
        <div className="navbar-start lg:hidden">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow md:mt-2 "
            >
              {links}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 text-base bg-white">{links}</ul>
        </div>

        {/* Show logo in center for small devices */}
        <div className="navbar-center lg:hidden">
          <Link to="/" className="flex items-center font-semibold text-2xl -ml-5">
            <img className="w-12 h-12 object-cover" src={logo} alt="NexCall Logo" />
            <span >NexCall</span>
          </Link>
        </div>

          <div className="flex border border-black/10 items-center ml-2 shadow-sm p-1">
            <IoSearchOutline className="text-gray-500 ml-3 rounded" />

            <input
              type="text"
              placeholder="Search"
              className="bg-transparent ml-2 outline-none text-black rounded"
            />
          </div>
        </div>
      </div>

  );
}

export default MeetingNavbar;
