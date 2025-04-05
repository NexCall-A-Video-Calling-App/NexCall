import React, { useEffect, useState } from "react";

import moment from "moment";

import { GoDeviceCameraVideo } from "react-icons/go";
import { Gi3dGlasses, GiTimeTrap } from "react-icons/gi";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsFillCameraReelsFill } from "react-icons/bs";

const MeetingFunctionpage = () => {
  // main function go under navbar

  const [time, settime] = useState("");
  const [fullTime, setfullTime] = useState("");

  const [JoinRoomId, setJoinRoomId] = useState(""); // RoomID from front-end input 

  // LIVE TIME
  useEffect(() => {
    // use effect work when side effect like api calling
    const callTime = setInterval(() => {
      settime(moment().format("LTS"));
      setfullTime(moment().format("MMMM Do YYYY"));
    }, 1000);

    return () => {
      clearInterval(callTime);
    };
  }, []);

  // CREATE ROOM FUNCTIONS
  const handleCreateRoom = () => {
    setLoading(true);
    socket.emit("createRoom", {
      name: user.displayName,
      profilePic: user.photoURL
    }); 
  };

  return (
    <div>
      <section className="w-full   border border-white/20 grid md:grid-cols-2  py-40 bg-slate-900 min-h-screen">
        <div className=" grid grid-cols-2 place-content-center place-items-center gap-2 ">
          <div
            onClick={handleCreateRoom}
            className="  flex flex-col items-center justify-center bg-violet-800 md:h-24 h-20  rounded-md w-1/2 ml-10 hover:cursor-pointer hover:bg-violet-400 transition delay-200 duration-100"
          >
            {/* meeting */}
            <BsFillCameraReelsFill className="text-4xl text-white font-bold  " />
            <span className="font-semibold text-white">New Meeting</span>
          </div>

          <div className=" flex flex-col items-center justify-center bg-indigo-700 md:h-24 h-20  rounded-md w-1/2 -ml-10 ">
            {/* Join */}
            <IoPersonAddSharp className="size-8 text-white" />
            <span className="font-semibold text-white">Join</span>
          </div>

          <div className=" flex flex-col items-center justify-center bg-blue-700 md:h-24 h-20 rounded-md w-1/2 ml-10">
            {/* sehedule */}
            {/* span inline element take neassy width how prove */}
            <GiTimeTrap className="size-8 text-white" />
            <span className="font-semibold text-white">Schedule</span>
          </div>

          <div className="flex flex-col items-center justify-center bg-lime-600 md:h-24 h-20  rounded-md w-1/2 -ml-10">
            {/* help */}
            <h2 className="text-xl font-semibold text-white">help</h2>
          </div>
        </div>

        <div id="asdf" className=" p-2 ">
          {/* show time */}
          {/* moments .js  */}
          <div className="text-center text-white">
            <p className="text-sm font-semibold"> {time}</p>
            <p className="text-xl font-semibold"> {fullTime}</p>
          </div>
          <div className="border h-56  rounded mt-4 border-red-100 opacity-30">
            <div className="flex justify-center items-center h-full">
              <p className="text-white opacity-45">No Uncomming meeting today</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeetingFunctionpage;
