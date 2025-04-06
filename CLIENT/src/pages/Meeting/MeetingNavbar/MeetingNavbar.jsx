import React from "react";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { IoChatboxEllipses, IoContract } from "react-icons/io5";
import { MdContactMail } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { IoSearchOutline } from "react-icons/io5";

function MeetingNavbar() {
  const links = (
    <div className="md:flex">
      <li>
        <Link className="md:flex md:flex-col  md:gap-0 text-gray-200 font-semibold">
          Home <IoMdHome />
        </Link>
      </li>

      <li>
        <Link className="md:flex md:flex-col  md:gap-0 text-gray-600 font-semibold">
          Chat <IoChatboxEllipses />
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
    <div>
      <div className="navbar bg-slate-900 shadow-sm w-full px-4 lg:px-12 md:px-10 sm:px-6 fixed border border-black/20">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className=" lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

            <div className="lg:visible invisible text-white text-xl font-semibold">
              Next Call
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base">{links}</ul>
        </div>
        <div className="navbar-end ">
          {/* implents search */}
          {/* need color change */}

          <div className="flex border border-black/40 items-center ml-2 shadow-xl p-1">
            <IoSearchOutline className="text-gray-500 ml-3" />

            <input
              type="text"
              placeholder="Search"
              className="bg-transparent ml-2 outline-none text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingNavbar;
