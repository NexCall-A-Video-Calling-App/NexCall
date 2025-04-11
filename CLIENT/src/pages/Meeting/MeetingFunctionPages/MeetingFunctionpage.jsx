import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import moment from "moment";
import { GoDeviceCameraVideo } from "react-icons/go";
import { Gi3dGlasses, GiTimeTrap } from "react-icons/gi";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsFillCameraReelsFill } from "react-icons/bs";
import useAuth from "../../../hooks/useAuth";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import socket from "../../../utilities/socket";
import { useForm } from "react-hook-form";
import axios from "axios";
// react icons
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import useScheduleData from "../../../hooks/schedule_data/useScheduleData";

import countDwon from "../../../hooks/CountDwon/countDwon";
import { SocketContext } from "../../../provider/SocketProvider";

const MeetingFunctionpage = () => {
  // main function go under navbar
  // /schedule-collections -> this is api end-point
  // to store schedule data
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { socket, currentRoom } = useContext(SocketContext);

  const [time, settime] = useState("");
  const [fullTime, setfullTime] = useState("");
  const { user, loading, setLoading } = useAuth();
  const navigate = useNavigate();

  const { isLoading, isError, refetch, scheduleData } = useScheduleData();
  console.log(scheduleData);

  const [joinRoomId, setJoinRoomId] = useState(""); // For joining a room

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

  // Schedule button
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data) => {
    const { Date, Time, Topic } = data;
    console.log(Date, Time, Topic);
    // gave condition

    if (Date && Time && Topic) {
      console.log("true");

      // send data to backend
      // also store user email

      const scheduleHandler = {
        Date,
        Time,
        Topic,
        email: user?.email,
      };

      axios
        .post("https://nexcall.up.railway.app/schedule-collections", scheduleHandler)

        .then((res) => {
          if (res.data.insertedId) {
            toast.success("done");
            refetch();
            // instant add task
            reset();
            setIsModalOpen(false);
          } else {
            toast.error("failed");
          }
        })
        .catch((error) => alert(error, "/schedule-collections"));
    } else {
      console.log("false");
      setIsModalOpen(false);
    }
  };

  // idea 1.count dwon time , show calender
  // after complete count dwon meeting delete from db
  // Navigate to Dashboard when currentRoom is set
  useEffect(() => {
    if (currentRoom) {
      setLoading(false);
      navigate("/dashboard");
    }
  }, [currentRoom, navigate, setLoading]);

  const handleCreateRoom = () => {
    setLoading(true);
    socket.emit("createRoom", {
      name: user?.displayName,
      profilePic: user?.photoURL,
      timestamp: new Date(),
    });
  };

  const handleJoinRoom = () => {
    if (!joinRoomId) return;
    setLoading(true);
    socket.emit("JoinRoom", {
      roomId: joinRoomId,
      userData: {
        name: user?.displayName,
        profilePic: user?.photoURL,
        email: user?.email,
      },
    });
    setJoinRoomId("");
  };

  // jai time a submit button click kora hobba oi time zoom id send korta hobba

  return (
    <div className=" ">
      <section
        className="w-full   border border-white/20 grid lg:grid-cols-2  py-40
        min-h-screen

     


    justify-center "
      >
        <section className="flex flex-col gap-4 w-full ">
          <div className="flex gap-x-4 ">
            <button
              onClick={handleCreateRoom}
              id="create"
              className="flex flex-col items-center justify-center bg-violet-800 md:h-24 h-20  rounded-md  ml-10 hover:cursor-pointer hover:bg-violet-400 transition delay-200 duration-100  w-40 md:w-44"
            >
              {/* meeting */}
              <BsFillCameraReelsFill className="text-4xl text-white font-bold  " />
              <span className="font-semibold text-white">New Meeting</span>
            </button>

            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="flex flex-col items-center justify-center bg-indigo-700 md:h-24 h-20 rounded-md  w-40 md:w-44 "
            >
              <IoPersonAddSharp className="size-8 text-white" />
              <span className="font-semibold text-white">Join</span>
            </button>
          </div>

          {/* add schedule and help  */}

          <div className="flex gap-x-4 px-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className=" flex flex-col items-center justify-center bg-blue-700 md:h-24 h-20 rounded-md  w-40 md:w-44"
            >
              {/* sehedule */}

              <GiTimeTrap className="size-8 text-white" />

              <span className="font-semibold text-white">Schedule</span>
            </button>
            {/* modal  */}
            <div
              className={`${
                isModalOpen ? " visible" : " invisible"
              } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] transition-all duration-300 `}
            >
              <div
                className={`${
                  isModalOpen
                    ? " translate-y-[0px] opacity-100"
                    : " translate-y-[-200px] opacity-0"
                } w-[80%] sm:w-[90%] md:w-[40%] bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8 `}
              >
                <button className=" flex items-end p-4 justify-between border-[#d1d1d1]  text-center w-full">
                  <h1 className="text-[1.5rem] font-bold text-center w-full  flex justify-center">
                    schedule
                  </h1>
                </button>

                <div className="p-4  border-[#d1d1d1]">
                  {/* inside this have info input box  */}
                  {/* use react hook form */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col md:gap-3 gap-2"
                  >
                    <input
                      {...register("Topic", { required: "Topic is requirerd" })}
                      {...register("Topic", { required: "Topic is requirerd" })}
                      className="border px-6 py-2 rounded focus:outline-blue-400"
                      placeholder="Topic"
                    />
                    {errors.Topic && (
                      <span className="text-red-500">
                        <span className="text-red-500">
                          This field is required
                        </span>
                      </span>
                    )}

                    <input
                      type="date"
                      {...register("Date", { required: "Date is required" })}
                      className="border px-6 py-2 rounded focus:outline-blue-400"
                      {...register("Date", { required: "Date is required" })}
                      placeholder="Date"
                    />
                    {errors.Date && (
                      <span className="text-red-500">
                        <span className="text-red-500">
                          This field is required
                        </span>
                      </span>
                    )}
                    <input
                      type="time"
                      {...register("Time", { required: "Time is requirred" })}
                      className="border px-6 py-2 rounded focus:outline-blue-400"
                      placeholder="Time"
                    />
                    {errors.Time && (
                      <span className="text-red-500">
                        {" "}
                        <span className="text-red-500">
                          This field is required
                        </span>
                      </span>
                    )}

                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}

                    <div className="flex items-end justify-end gap-4 p-4 ">
                      <button
                        className="py-2 px-4 hover:bg-gray-100 border border-[#d1d1d1] rounded-md outline-none text-[#353535]"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-2 px-4 border border-[#d1d1d1] rounded-md outline-none bg-[#3B9DF8] text-[#fff]"

                        //  work on false

                        // onClick={() => setIsModalOpen(false)}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <button className="flex flex-col items-center justify-center bg-lime-600 md:h-24 h-20   w-40 md:w-44 rounded-md">
              {/* help */}
              <h2 className="text-xl font-semibold text-white">help</h2>
            </button>
          </div>
        </section>

        <div id="asdf" className=" p-2 md:mt-0 mt-4  ">
          {/* show time */}
          {/* moments .js  */}
          <div className="text-center text-black border">
            <p className="text-sm font-semibold"> {time}</p>
            <p className="text-xl font-semibold"> {fullTime}</p>
          </div>

          <div className="w-full h-56 rounded   border ">
            <div className="flex   flex-col overflow-y-scroll gap-4  h-full  p-2">
              <div className="overflow-x-auto rounded-box border  w-full bg-stone-100">
                <table className="table  ">
                  {/* head */}
                  <thead className="">
                    <tr>
                      <th>Serial</th>
                      <th>Topic</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Countdwon</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* row 1 */}

                    {scheduleData
                      .filter((schedule) => {
                        const now = new Date();
                        const meetingTime = new Date(
                          `${schedule.Date} ${schedule.Time}`
                        );
                        return meetingTime > now;
                      })
                      .map((schedule, index) => (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{schedule.Topic}</td>
                          <td>{schedule.Date}</td>
                          <td>{schedule.Time}</td>
                          <td>{countDwon(schedule.Date, schedule.Time)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {scheduleData.length === 0 && (
                <span className="flex justify-center items-center w-full text-xl md:text-2xl font-semibold">
                  {" "}
                  No Schedule
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" className="flex gap-2 items-center">
            <input
              type="text"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="input"
            />
            <button
              onClick={handleJoinRoom}
              className="btn text-white bg-indigo-500 hover:bg-indigo-600 p-1 rounded text-sm"
            >
              Join Room
            </button>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MeetingFunctionpage;
