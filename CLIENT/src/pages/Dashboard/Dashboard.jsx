import { useState } from "react";
import { FaVideo, FaPhoneAlt, FaEllipsisV, FaBars } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GoBell } from "react-icons/go";
// bell icon


const Dashboard = () => {
    
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const navigate = useNavigate();


    // bell icon 
    const hadnelBellicon = ()=>{
        alert("done")
    }

    return (
        <div className="flex h-screen bg-gray-100 relative -mt-16">

            {/* Sidebar */}
            <div className={`fixed md:static top-0 left-0 h-full w-64 bg-white p-4 border-r shadow-lg z-20 transition-transform transform ${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col`}>
                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto">
                   
                   <div className="flex justify-between">
                   <h2 className="text-lg font-semibold">Messages</h2>
                   <button className=""  onClick={hadnelBellicon}><GoBell/></button>
                   {/* bell icon */}
                   </div>


                    <input
                        type="text"
                        placeholder="Search messages"
                        className="w-full p-2 mt-2 border rounded-lg"
                    />
                    <div className="mt-4">
                        <div className="flex items-center p-2 border rounded-lg">
                            <img src="https://i.ibb.co/mFvskD5/icons8-avatars-48.png" alt="avatar" className="w-10 h-10 rounded-full" />
                            <div className="ml-2">
                                <p className="font-semibold">Sarah Johnson</p>
                                <p className="text-sm text-gray-500">Hey, when is the next meeting?</p>
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
                        onClick={() => navigate('/')}
                        className="w-full border flex justify-center items-center gap-2 mt-4 p-2  rounded-lg hover:bg-purple-600 transition-colors"
                    >
                        <IoHome /> Back to Home
                    </button>

                    {/* Profile */}
                    <button
                        className="w-full flex justify-center items-center gap-2 mt-2 p-2 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        <img src="https://i.ibb.co/mFvskD5/icons8-avatars-48.png" alt="avatar" className="w-8 h-8 rounded-full" />
                        <span>My Profile</span>
                    </button>
                </div>
            </div>

            {/* Overlay for Sidebar */}
            {showSidebar && <div className="fixed inset-0 bg-black opacity-50 z-10 md:hidden" onClick={toggleSidebar}></div>}

            {/* Chat Window */}
            <div className="flex-1 flex flex-col min-h-screen">
                <div className="flex items-center justify-between p-4 bg-white border-b shadow-md">
                    <div className="flex items-center">
                        {/* Sidebar Toggle Button for Small Screens */}
                        <button className="md:hidden text-xl md:p-2 mr-2" onClick={toggleSidebar}>
                            {/* <FaEllipsisV /> */}
                            <FaBars />
                        </button>
                        <img src="https://i.ibb.co/mFvskD5/icons8-avatars-48.png" alt="avatar" className="w-10 h-10 rounded-full" />
                        <div className="ml-1 md:ml-2">
                            <p className="font-semibold text-sm md:text-base">Sarah Johnson</p>
                            <p className="text-sm text-green-500">Online</p>
                        </div>
                    </div>
                    <div className="flex gap-1 md:space-x-2 ">
                        <button className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2 bg-purple-500 text-white rounded-lg text-sm md:text-base">
                            <span ><FaVideo /></span> <span className="hidden md:block">Video Call</span>
                        </button>
                        <button className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2 bg-purple-500 text-white rounded-lg text-sm md:text-base">
                            <span ><FaPhoneAlt /> </span><span className="hidden md:block">Voice Call</span>
                        </button>
                    </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    {/* Chat Messages */}
                    <div className="mb-4">
                        <p className="text-sm font-semibold"></p>
                        <p className="text-gray-700 bg-white p-2 rounded-lg inline-block"></p>
                        <p className="text-xs text-gray-400"></p>
                    </div>
                </div>
                <div className="p-4 border-t bg-white flex items-center">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full p-2 border rounded-lg"
                    />
                    <button className="ml-2 p-2 text-2xl bg-purple-500 text-white rounded-lg">
                        <IoIosSend />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
