


import React from 'react'
import { Link } from 'react-router-dom';
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
            <Link  className="md:flex md:flex-col  md:gap-0 text-gray-600 font-semibold">
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



    </div>
  )
}

export default MeetingNavbar