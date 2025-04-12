import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/nclogo.png";
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
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-44 p-2 shadow"
            >
              {links}
            </ul>
          </div>
        </div>

        {/* Logo: always on the left */}
        <div className="navbar-start hidden lg:flex">
          <Link to="/" className="flex items-center font-semibold text-2xl">
            <img className="w-12 h-12 object-cover" src={logo} alt="NexCall Logo" />
            <span >NexCall</span>
          </Link>
        </div>

        {/* Center links for large screens */}
        <div className="hidden lg:flex lg:mx-auto">
          <ul className="menu menu-horizontal px-1 text-base flex-nowrap">{links}</ul>
        </div>

        {/* Show logo in center for small devices */}
        <div className="navbar-center lg:hidden">
          <Link to="/" className="flex items-center font-semibold text-2xl -ml-5">
            <img className="w-12 h-12 object-cover" src={logo} alt="NexCall Logo" />
            <span >NexCall</span>
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
