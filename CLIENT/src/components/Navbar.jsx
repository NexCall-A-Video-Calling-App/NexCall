import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/nclogo.png";
import useAuth from "../hooks/useAuth";
import { MdOutlineVoiceChat } from "react-icons/md";
import toast from "react-hot-toast";

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
      <div className="container mx-auto navbar px-2 ">
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
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-44 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <Link
            to={"/"}
            className="flex items-center  text-xl"
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
          <div className="dropdown dropdown-end">
            {
              user ? (
                <>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img src={user?.photoURL} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full" alt="" />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-44 p-2 shadow">
                      <li>
                        <Link to={'/profile'}>Profile</Link>
                      </li>
                      <li>
                        <Link to={'/meeting'}>Dashboard</Link>
                      </li>
                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <Link to="/sign-in" className="btn">
                  Sign in
                </Link>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
