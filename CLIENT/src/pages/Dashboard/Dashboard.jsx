import { useContext, useEffect, useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaEllipsisV, FaVideo, FaPhoneAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoIosSend, IoMdInformationCircleOutline } from "react-icons/io";
import { RiChatDownloadLine } from "react-icons/ri";
import { encryptMessage, decryptMessage } from "../../utilities/encryptDecrypt";
import { downloadMessagesAsPDF } from "../../utilities/downloadMessagesAsPDF"
import Spinner from "../../components/Spinner";
import { SocketContext } from './../../provider/SocketProvider';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const { socket, currentRoom, UserId, creator, createdAt } = useContext(SocketContext);
  const { user, userLogOut, loading, setLoading } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [spin, setSpin] = useState(false);
  const [messages, setMessages] = useState([]); // all messages(both sender & receiver) 
  const [message, setMessage] = useState(""); // single message from sender 
  const [roomUsers, setRoomUsers] = useState([]);  // sockets or users that are connected in the room.   
  const [searchUser, setSearchUser] = useState("")

  const navigate = useNavigate();
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  useEffect(() => {
    if (!currentRoom) return; // Prevent running if no room is set

    const handleUpdatedRoomUser = (users) => {
      console.log("Received updatedRoomUser:", users);
      setRoomUsers(users);
    };

    socket.on("updatedRoomUser", handleUpdatedRoomUser);

    // Request initial room users when joining or loading the dashboard
    socket.emit("getRoomUsers", currentRoom);

    // Handle incoming messages
    socket.on("receiveMessage", (msg) => {
      const decryptedMessage = {
        ...msg,
        message: decryptMessage(msg.message),
      };
      setMessages((prevMsg) => [...prevMsg, decryptedMessage]);
    });

    return () => {
      socket.off("updatedRoomUser", handleUpdatedRoomUser);
      socket.off("receiveMessage");
    };
  }, [currentRoom, socket]);

  const handleLogOut = () => {
    userLogOut()
      .then(() => {
        // Sign-out successful.
        toast.success("Log out successfully")
        socket.disconnect();
        // Redirect to sign-in page
        navigate('/sign-in')
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  }

  const otherUser = roomUsers.find(u => u.socketId !== UserId);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() && currentRoom) {
      const encrypted = encryptMessage(message);
      socket.emit("sentMessage", {
        room: currentRoom,
        message: encrypted,
        senderName: user?.displayName,
        senderEmail: user?.email,
        photo: user?.photoURL,
        receiverName: otherUser?.name
      });
      setMessage("");
    }
  };

  // Download messages as PDF 
  const handleDownloadMessagesAsPDF = () => {
    downloadMessagesAsPDF(currentRoom, messages)
  };

  const handleProfileClick = () => {
    setSpin(true);
    setTimeout(() => {
      navigate('/userProfile');
    }, 1500);
  };

  if (!currentRoom) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <p>Please create or join a room first.</p>
        <button
          onClick={() => navigate('/meeting')}
          className="mt-4 p-2 bg-purple-500 text-white rounded-lg"
        >
          Go to Meeting Page
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 relative -mt-16">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white p-4 border-r shadow-lg z-20 transition-transform duration-700 transform ${showSidebar ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 flex flex-col`}
      >
        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          <h2 className="text-lg font-semibold">Users</h2>
          <input
            id="searchUser"
            onChange={(e) => setSearchUser(e.target.value)}
            type="text"
            placeholder="Search users"
            className="w-full p-2 mt-2 border rounded-lg"
          />
          <div className="mt-4">
            {
              roomUsers
                .filter((userFilter) => userFilter?.name?.toLowerCase().includes(searchUser?.toLowerCase()))
                .map((userinRoom, idx) => (
                  <div key={idx}>
                    <h1>{idx + 1}: {userinRoom.name}</h1>
                  </div>
                ))
            }
          </div>
        </div>

        {/* Logout an Profile */}
        <div className="mt-auto">
          {/* <div className="divider"></div> */}
          {/* Back to Home */}
          <Link
            to='/meeting'
            className="w-full border flex justify-center items-center gap-2 mt-4 p-2  rounded-lg hover:bg-purple-600 transition-colors"
          >
            <IoHome /> Back to Dashboard
          </Link>

          {/* Profile */}
          <div className="dropdown dropdown-top dropdown-center w-full">
            <div
              tabIndex={0}
              role="button"
              className="border w-full flex justify-center items-center gap-2 mt-2 p-2 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <img
                src={user?.photoURL}
                referrerPolicy="no-referrer"
                alt="avatar"
                className="w-6 h-6 rounded-full"
              />
              <span>{user?.displayName || "Anonymous user"}</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <button
                  onClick={handleProfileClick}
                  className="btn btn-sm w-full mb-2"
                >
                  Profile
                </button>
              </li>
              <li>
                {spin ? (
                  <div className="flex justify-center py-2">
                    <Spinner />
                  </div>
                ) : (
                  <button onClick={handleLogOut} className="btn btn-sm w-full">
                    Log out
                  </button>
                )}
              </li>
            </ul>
          </div>
          {spin && <Spinner />}

        </div>
      </div>

      {/* Overlay for Sidebar */}
      {showSidebar && <div className="fixed inset-0 bg-black opacity-50 z-10 md:hidden" onClick={toggleSidebar} ></div>}


      {/* Chat Window */}

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-white border-b shadow-md">
          <div className="flex items-center">
            <button className="md:hidden text-xl md:p-2" onClick={toggleSidebar}>
              <FaEllipsisV />
            </button>
            <img
              src={otherUser?.profilePic || "https://i.ibb.co.com/5gDBVLDV/images.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-1 md:ml-2">
              <p className="font-semibold text-sm md:text-base">
                {roomUsers.length === 2
                  ? roomUsers.find(u => u.socketId !== UserId)?.name || "Unknown User"
                  : roomUsers.length > 2
                    ? `${roomUsers.find(u => u.socketId !== UserId)?.name} +${roomUsers.length - 1}`
                    : "Waiting for others"}
              </p>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
          <div className="flex gap-1 md:space-x-2">
            <button className="flex items-center gap-1 md:gap-2 px-1 md:px-4 py-2 md:py-2 bg-purple-500 text-white rounded-lg text-sm md:text-base">
              <FaVideo />
            </button>
            <button className="flex items-center gap-1 md:gap-2 px-1 md:px-4 py-2 md:py-2 bg-purple-500 text-white rounded-lg text-sm md:text-base">
              <FaPhoneAlt />
            </button>
            <button
              onClick={() => document.getElementById('my_modal_3').showModal()}
              className="flex items-center gap-1 md:gap-2 px-1 md:px-4 py-2 md:py-2 bg-purple-500 text-white rounded-lg text-sm md:text-lg"
            >
              <IoMdInformationCircleOutline />
            </button>
            <button
              onClick={handleDownloadMessagesAsPDF}
              className="flex items-center gap-1 md:gap-2 px-1 md:px-4 py-2 md:py-2 bg-purple-500 text-white rounded-lg text-sm md:text-lg"
            >
              <RiChatDownloadLine />
            </button>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === UserId ? "justify-end" : "justify-start"}`}
              >
                <div className="flex gap-1">
                  <div className="h-full flex justify-center items-end">
                    <img
                      referrerPolicy="no-referrer"
                      className="w-4 h-4 rounded-full mb-1"
                      src={msg.photo}
                      alt=""
                    />
                  </div>
                  <div
                    title={msg.senderName}
                    className={` ${msg.sender === UserId
                      ? "bg-blue-500 text-white mb-1"
                      : "bg-black text-white mb-1"
                      } p-2 rounded-lg`}
                  >
                    {msg.message}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSend}
          className="p-4 border-t bg-white flex items-center"
        >
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border rounded-lg"
          />
          <button className="ml-2 p-2 text-2xl bg-purple-500 text-white rounded-lg">
            <IoIosSend />
          </button>
        </form>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box relative p-10">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
            Room Code: {currentRoom}
            <button
              onClick={() => {
                navigator.clipboard.writeText(currentRoom);
              }}
              className="btn btn-sm btn-outline tooltip"
              data-tip="Copy Room Code"
            >
              📋
            </button>
          </h3>

          <div className="text-sm text-gray-500 mt-4 space-y-1">
            <p>
              <span className="font-semibold text-gray-600">Created At:</span>{" "}
              {new Date(createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Creator:</span> {creator}
            </p>
          </div>
        </div>
      </dialog>



    </div>
  );
};

export default Dashboard;
