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
    const userData = {
      name: user?.displayName,
      profilePic: user?.photoURL,
      timestamp: new Date(),
    };
    socket.emit("createRoom", userData);

    // Listen for RoomCreated event from server
    socket.on("RoomCreated", (roomId, name, timestamp) => {
      setCurrentRoom(roomId); // Set 100ms roomId as currentRoom
      setLoading(false);
      navigate("/dashboard");
    });

    // Handle errors
    socket.on("RoomCreationError", (error) => {
      toast.error(error);
      setLoading(false);
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
    <div className="container mx-auto ">
      <section
        className="w-full border border-white/20 grid md:grid-cols-2  py-40 justify-center"
      >
        {/* Left Panel */}
        <section className="flex flex-col gap-6">
          {/* Top Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button
              onClick={handleCreateRoom}
              className="flex flex-col items-center justify-center bg-violet-800 hover:bg-violet-600 transition-all h-24 w-36 md:h-28 md:w-36 lg:h-28 lg:w-48 rounded-lg text-white"
            >
              <BsFillCameraReelsFill className="text-3xl mb-1" />
              <span className="font-medium">New Meeting</span>
            </button>

            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="flex flex-col items-center justify-center bg-indigo-700 hover:bg-indigo-500 transition-all h-24 w-36 md:h-28 md:w-36 lg:h-28 lg:w-48 rounded-lg text-white"
            >
              <IoPersonAddSharp className="text-3xl mb-1" />
              <span className="font-medium">Join</span>
            </button>
          </div>

          {/* Schedule & Help Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex flex-col items-center justify-center bg-blue-700 hover:bg-blue-500 transition-all h-24 w-36 md:h-28 md:w-36 lg:h-28 lg:w-48 rounded-lg text-white"
            >
              <GiTimeTrap className="text-3xl mb-1" />
              <span className="font-medium">Schedule</span>
            </button>

            <button className="flex flex-col items-center justify-center bg-lime-600 hover:bg-lime-500 transition-all h-24 w-36 md:h-28 md:w-36 lg:h-28 lg:w-48 rounded-lg text-white">
              <h2 className="text-xl font-medium">Help</h2>
            </button>
          </div>
        </section>

        <div id="asdf" className="p-4 md:mt-0 mt-6 w-full">
          {/* Time display */}
          <div className="bg-white border rounded-lg p-4 shadow mb-6 text-center">
            <p className="text-sm text-gray-500 font-medium">{time}</p>
            <p className="text-2xl font-bold text-indigo-600">{fullTime}</p>
          </div>

          {/* Schedule Table */}
          <div className="w-full max-h-64 rounded-lg border shadow bg-white overflow-hidden">
            <div className="h-full overflow-y-auto p-2 space-y-4">
              {scheduleData.length > 0 ? (
                // Responsive horizontal scroll wrapper
                <div className="w-full overflow-x-auto">
                  <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-indigo-100 text-gray-800 font-semibold">
                      <tr>
                        <th className="w-12 whitespace-nowrap px-2 py-2">Serial</th>
                        <th className="whitespace-nowrap px-2 py-2">Topic</th>
                        <th className="whitespace-nowrap px-2 py-2">Date</th>
                        <th className="whitespace-nowrap px-2 py-2">Time</th>
                        <th className="whitespace-nowrap px-2 py-2">Countdown</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleData
                        .filter((schedule) => {
                          const now = new Date();
                          const meetingTime = new Date(`${schedule.Date} ${schedule.Time}`);
                          return meetingTime > now;
                        })
                        .map((schedule, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition">
                            <td className="w-12 font-medium px-2 py-2">{index + 1}</td>
                            <td className="px-2 py-2">{schedule.Topic}</td>
                            <td className="px-2 py-2">{schedule.Date}</td>
                            <td className="px-2 py-2">{schedule.Time}</td>
                            <td className="px-2 py-2">{countDwon(schedule.Date, schedule.Time)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex justify-center items-center h-full text-xl text-gray-600 font-semibold">
                  No Schedule Found
                </div>
              )}
            </div>
          </div>
        </div>


      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
            <div className="p-6 border-b">
              <h1 className="text-xl font-bold text-center">Schedule Meeting</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <input {...register("Topic", { required: "Topic is required" })} className="w-full border rounded px-4 py-2" placeholder="Topic" />
                {errors.Topic && <span className="text-red-500 text-sm">{errors.Topic.message}</span>}
              </div>

              <div>
                <input type="date" {...register("Date", { required: "Date is required" })} className="w-full border rounded px-4 py-2" />
                {errors.Date && <span className="text-red-500 text-sm">{errors.Date.message}</span>}
              </div>

              <div>
                <input type="time" {...register("Time", { required: "Time is required" })} className="w-full border rounded px-4 py-2" />
                {errors.Time && <span className="text-red-500 text-sm">{errors.Time.message}</span>}
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Room Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-md w-full rounded-xl shadow-lg border bg-white p-6 relative">
          {/* Close Button */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 hover:bg-gray-200">
              ✕
            </button>
          </form>

          {/* Modal Title */}
          <h3 className="text-lg font-bold mb-4 text-center text-gray-800">Join a Meeting Room</h3>

          {/* Input & Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleJoinRoom}
              className="w-full sm:w-auto px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Join
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MeetingFunctionpage;
