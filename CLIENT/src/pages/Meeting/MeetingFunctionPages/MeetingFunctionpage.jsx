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
        className="w-full   border border-white/20 grid md:grid-cols-2  py-40 min-h-screen justify-center "
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
