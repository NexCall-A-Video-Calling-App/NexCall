import React, { useEffect, useState } from "react";
import { GoDeviceCameraVideo } from "react-icons/go";
import { Gi3dGlasses, GiTimeTrap } from "react-icons/gi";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsFillCameraReelsFill } from "react-icons/bs";

const MeetingFunctionpage = () => {
  // main function go under navbar

  const [time, settime] = useState("");
  const [fullTime, setfullTime] = useState("");

  useEffect(() => {
    // use effect work when side effect like api calling
    const callTime = setInterval(() => {
      settime(moment().format("LTS"));
      setfullTime(moment().format("MMMM Do YYYY"));
    }, 1000);

    return () => {
      clearInterval(callTime);
    };
  });

  return (
    <div>
      <section className="w-full   border border-white/20 grid md:grid-cols-2  ">
      <div className=' grid grid-cols-2  place-content-center place-items-center gap-2 '>

      <div className='  flex flex-col items-center justify-center bg-violet-800 md:h-24 h-20  rounded-md w-1/2 ml-10
         hover:cursor-pointer hover:bg-violet-400 transition delay-200 duration-100'>

            {/* meeting */}
            <BsFillCameraReelsFill className='text-4xl text-white font-bold  '/>
            <span className='font-semibold text-white'>New Meeting</span>




          </div>

          <div className=' flex flex-col items-center justify-center bg-blue-600 md:h-24 h-20  rounded-md w-1/2 -ml-10 '>
            {/* Join */}
            <IoPersonAddSharp className='size-8 text-white'/>
            <span className='font-semibold text-white'>Join</span>
            
          </div>


      </div>
      
      
      
      </section>
    </div>
  );
};

export default MeetingFunctionpage;
