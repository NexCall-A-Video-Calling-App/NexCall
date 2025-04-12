import React from "react";
import { IoMdHome } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdContactMail } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { Link } from "react-router-dom";
import UserMenu from "../../../components/UserMenu";
import logo from "../../../assets/nclogo.png";

function MeetingNavbar() {
  const links = (
    <div className="md:flex">
      <li>
        <Link to={'/meeting'} className="md:flex md:flex-col  md:gap-0 text-gray-200 font-semibold">
          Home <IoMdHome />
        </Link>
      </li>

      <li>
        <Link to={'/meeting/chat-history'} className="md:flex md:flex-col  md:gap-0 text-gray-600 font-semibold">
          Chat History <IoChatboxEllipses />
        </Link>
      </li>

      <li>
        <Link className="md:flex md:flex-col  md:gap-0 text-gray-600 font-semibold">
          Meeting <SiGoogleclassroom />
        </Link>
      </li>

      <li>
        <Link className="md:flex md:flex-col  md:gap-0 text-gray-600 font-semibold">
          Contact <MdContactMail />
        </Link>
      </li>
    </div>
  );

  return (
    <div className="">
      <div className="navbar  shadow-md w-full px-4 lg:px-12 md:px-10 sm:px-6 fixed top-0  border border-black/20 z-50 bg-white ">

        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className=" lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black mt-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>

            <Link
              to={"/"}
              className="flex items-center font-semibold text-2xl"
            >
              <img
                className="w-12 h-12 object-cover"
                src={logo}
                alt="NexCall Logo"
              />
              <span>NexCall</span>
            </Link>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow md:mt-2 bg-slate-900 text-stone-500"
            >
              {links}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 text-base">{links}</ul>
        </div>

        <div className="navbar-end ">
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </div>
  );
}

export default MeetingNavbar;
