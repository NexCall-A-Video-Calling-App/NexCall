import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/nclogo.png";
import useAuth from "../hooks/useAuth";
import { MdOutlineVoiceChat } from "react-icons/md";

const Navbar = () => {
  const { user } = useAuth();
  console.log(user)
  const links = (
    <>
      <li>
        <Link to={"/product"}>Product</Link>
      </li>
      <li>
        <Link to={"/resource"}>Resouce</Link>
      </li>
      <li>
        <Link to={"/company"}>Company</Link>
      </li>
      <li>
        <Link to={"/pricing"}>Pricing</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm w-full px-4 lg:px-12 md:px-10 sm:px-6 fixed top-0 z-50">
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Link
          to={"/"}
          className="flex items-center hover:underline hover:text-blue-700 text-xl"
        >
          <img
            className="w-10 h-10 object-cover"
            src={logo}
            alt="NexCall Logo"
          />
          <span>NexCall</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="indicator">
            <Link to={"/meeting"}>
              <img src={user?.photoURL} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full" alt="" />
            </Link>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        ) : (
          <Link to="/sign-up" className="btn">
            SignUp
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
