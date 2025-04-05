import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaEllipsisV, FaVideo, FaPhoneAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoIosSend, IoMdInformationCircleOutline } from "react-icons/io";
import { ImMakeGroup } from "react-icons/im";
import { HiUserAdd } from "react-icons/hi";
import { RiChatDownloadLine } from "react-icons/ri";
import jsPDF from "jspdf";

const Dashboard = () => {
  const socket = useMemo(() => io.connect("http://localhost:5000"), []);
  const { user, userLogOut, loading, setLoading } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const navigate = useNavigate();
  const handleLogOut = () => {
    userLogOut()
      .then(() => {
        // Sign-out successful.
        toast.success("Log out successfully")
        // Redirect to sign-in page
        navigate('/sign-in')
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  }

  // CHAT STATES
  const [JoinRoomId, setJoinRoomId] = useState(""); // RoomID from front-end input 
  const [CurrentRoom, setCurrentRoom] = useState(null); // ROOMID comes from back-end 
  const [UserId, setUserId] = useState(null);  // Client Socket ID 
  const [messages, setMessages] = useState([]); // all messages(both sender & receiver) 
  const [message, setMessage] = useState(""); // single message from sender 
  const [roomUsers, setRoomUsers] = useState([]);  // sockets or users that are connected in the room.   

  // CHAT SIDE EFFECT
  useEffect(() => {
    socket.on("connect", () => {
      setUserId(socket.id);
      console.log("My ID: ", socket.id);
    });

    socket.on("RoomCreated", (roomId) => {
      setCurrentRoom(roomId);
      console.log("from DB", roomId)
      setMessages([]);
      setLoading(false);
    });

    socket.on("RoomJoined", (roomId) => {
      setCurrentRoom(roomId);
      setMessages([]);
      setLoading(false);
    });

    socket.on("updatedRoomUser", (users) => {
      setRoomUsers(users);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prevMsg) => [...prevMsg, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);
  const otherUser = roomUsers.find(u => u.socketId !== UserId);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() && CurrentRoom) {
      socket.emit("sentMessage", {
        room: CurrentRoom,
        message,
        senderName: user?.displayName,
        receiverName: otherUser?.name
      });
      setMessage("");
    }
  };

  const handleCreateRoom = () => {
    setLoading(true);
    socket.emit("createRoom", {
      name: user.displayName,
      profilePic: user.photoURL
    });
  };

  const handleJoinRoom = (roomId) => {
    if (!JoinRoomId) return;
    setLoading(true);
    socket.emit("JoinRoom", {
      roomId,
      userData: { name: user.displayName, profilePic: user.photoURL }
    });
  };

  // Download messages as PDF
  const handleDownloadMessagesAsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Set background color for Room ID and Downloaded At
    const headerHeight = 20;
    doc.setFillColor(200, 200, 255);
    doc.rect(0, 0, doc.internal.pageSize.width, headerHeight, 'F');

    // Add the text on the left (Room ID)
    doc.setTextColor(0, 0, 0);
    doc.text(`Room ID: ${CurrentRoom}`, 10, 15);

    // Add the text on the right (Downloaded At)
    doc.text(`Downloaded At: ${new Date().toLocaleString()}`, doc.internal.pageSize.width - 10 - doc.getTextWidth(`Downloaded At: ${new Date().toLocaleString()}`), 15);

    let y = 30;
    messages.forEach((msg, index) => {
      const text = `${msg.senderName || "Unknown"}: ${msg.message}`;
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(text, 10, y);
      y += 10;
    });

    doc.save(`room-${CurrentRoom}-messages.pdf`);
  };

  const JoinInit = (e) => {
    e.preventDefault()
    handleJoinRoom(JoinRoomId)
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
          <h2 className="text-lg font-semibold">Messages</h2>
          <input
            type="text"
            placeholder="Search messages"
            className="w-full p-2 mt-2 border rounded-lg"
          />
          <div className="mt-4">
            <div className="flex items-center p-2 border rounded-lg">
              <img
                src="https://i.ibb.co.com/5gDBVLDV/images.png"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-2">
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm text-gray-500">
                  Hey, when is the next meeting?
                </p>
              </div>
              <span className="ml-auto text-xs text-gray-400">2m ago</span>
            </div>
          </div>
        </div>

        {/* Logout an Profile */}
        <div className="mt-auto">
          {/* <div className="divider"></div> */}
          {/* Back to Home */}
          <button
            onClick={() => navigate("/")}
            className="w-full border flex justify-center items-center gap-2 mt-4 p-2  rounded-lg hover:bg-purple-600 transition-colors"
          >
            <IoHome /> Back to Home
          </button>

          {/* Profile */}
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="drawer-button border w-full flex justify-center items-center gap-2 mt-2 p-2 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                <img
                  src={user?.photoURL}
                  referrerPolicy="no-referrer"
                  alt="avatar"
                  className="w-6 h-6 rounded-full"
                />
                <span>{user?.displayName || "Anonymous user"}</span>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-50 p-4">
                {/* Sidebar content here */}
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
                <li className="mt-auto">
                  <button className="btn btn-sm w-full mb-2"><Link to={'/userProfile'} className="w-full">Profile</Link></button>
                  <button onClick={handleLogOut} className="btn btn-sm w-full">Log out</button>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Overlay for Sidebar */}
      {showSidebar && <div className="fixed inset-0 bg-black opacity-50 z-10 md:hidden" onClick={toggleSidebar} ></div>}


      {/* Join or Create Window */}

      {CurrentRoom ? (
        <>
          {/* Chat Window */}
          <div className="flex-1 flex flex-col min-h-screen">
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
                    {otherUser?.name || "Unknown User"}
                  </p>
                  <p className="text-sm text-green-500">Online</p>
                </div>
              </div>
              <div className="flex gap-1 md:space-x-2 ">
                <button className="flex items-center gap-1 md:gap-2 px-1 md:px-4 py-2 md:py-2 bg-purple-500 text-white rounded-lg text-sm md:text-base">
                  <FaVideo />
                </button>
                <button className="flex items-center gap-1 md:gap-2  px-1 md:px-4 py-2 md:py-2 bg-purple-500 text-white rounded-lg text-sm md:text-base">
                  <FaPhoneAlt />
                </button>
                <button
                  onClick={() => document.getElementById('my_modal_3').showModal()}
                  className="flex items-center gap-1 md:gap-2  px-1 md:px-4 py-2 md:py-2 bg-purple-500 text-white rounded-lg text-sm md:text-lg">
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
              {/* Chat Messages */}
              <div className="mb-4">
                {
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === UserId ? "justify-end" : "justify-start"
                        }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${msg.sender === UserId
                          ? "bg-blue-500 text-white mb-1"
                          : "bg-black text-white mb-1"
                          }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <form
              onSubmit={handleSend}
              className="p-4 border-t bg-white flex items-center">
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
        </>
      ) : (
        <div className="bg-gray-100 flex-1 flex flex-col justify-center items-center min-h-screen">
          <div className="bg-white shadow-2xl rounded-md">
            <button onClick={handleCreateRoom} className="btn w-full bg-primary text-white text-lg">
              Create Room <ImMakeGroup />
            </button>
            <div className="divider">OR</div>
            <form
              onSubmit={JoinInit}
              className="px-5 py-3">
              <input
                onChange={(e) => setJoinRoomId(e.target.value)}
                value={JoinRoomId}
                type="text"
                name="JoinRoom"
                className="input"
                placeholder="Type Room Id"
              />
              <button type="submit" className="text-white text-lg btn w-full bg-primary mt-3 ">
                Join Room <HiUserAdd />
              </button>
            </form>
          </div>
        </div>
      )}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Room Code: {CurrentRoom}</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
};

export default Dashboard;