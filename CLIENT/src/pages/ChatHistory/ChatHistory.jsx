import { useQuery } from "@tanstack/react-query";
import React, { useState } from 'react';
import { RiChatDownloadLine } from 'react-icons/ri';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { decryptMessage } from "../../utilities/encryptDecrypt";
import { downloadMessagesAsPDF } from "../../utilities/downloadMessagesAsPDF"

const ChatHistory = () => {
    const axios = useAxiosSecure();
    const { user } = useAuth();

    // Fetch all chat rooms (conversations) that the user has participated in
    const { data: userConversations = [], refetch } = useQuery({
        queryKey: ['userConversations', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/conversations/user/${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    });

    return (
        <div className="container mx-auto p-4 bg-white rounded-lg mt-4 w-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">📜 Your Chat History</h2>

            {userConversations.length === 0 && (
                <p className="text-gray-500">No chat history found.</p>
            )}

            {userConversations.map((room, idx) => (
                <div key={idx} className="mb-8 border border-gray-200 rounded-xl shadow-sm bg-gray-50">

                    {/* Room ID and Download Button Section */}
                    <div className="flex items-center justify-between  p-3 bg-gray-100 rounded-t-xl border-b">
                        <h3 className="text-lg font-semibold ">
                            <span className="text-gray-800">Room ID:</span> <span className="text-purple-700">{room.room}</span>
                        </h3>
                        <button
                            onClick={() => {
                                const decryptedMessages = room.messages.map((msg) => ({
                                    ...msg,
                                    message: decryptMessage(msg.message)
                                }));

                                downloadMessagesAsPDF(room.room, decryptedMessages);
                            }}
                            className="flex items-center text-sm md:text-base bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
                        >
                            <RiChatDownloadLine className="mr-1" />
                            Download
                        </button>
                    </div>

                    {/* Messages Section */}
                    <div className="max-h-96 overflow-y-auto px-2 mb-2 space-y-3">
                        {room.messages.map((msg, i) => {
                            const isSender = msg.senderEmail === user?.email;
                            const decryptedMessage = decryptMessage(msg.message);

                            const prevMsg = room.messages[i - 1];
                            const isNewSender = !prevMsg || prevMsg.senderEmail !== msg.senderEmail;

                            return (
                                <div
                                    key={i}
                                    className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}
                                >
                                    {isNewSender && (
                                        <p
                                            className={`text-xs mb-1 ${isSender ? "pr-10 text-right" : "pl-10 text-left"} text-gray-500`}
                                        >
                                            {msg.senderName}
                                        </p>
                                    )}

                                    {/* Message Bubble Section */}
                                    <div
                                        className={`flex items-end max-w-xs sm:max-w-sm md:max-w-md ${isSender ? "flex-row-reverse" : ""}`}
                                    >
                                        {/* Profile Image */}
                                        <img
                                            src={msg.photo || "https://img.icons8.com/?size=50&id=7819&format=png"}
                                            alt="profile"
                                            className="w-7 h-7 rounded-full object-cover"
                                        />

                                        {/* Message Bubble */}
                                        <div
                                            className={`${isSender ? "mr-2" : "ml-2"} p-3 rounded-2xl relative ${isSender
                                                ? "bg-primary text-white rounded-br-none"
                                                : "bg-gray-200 text-gray-900 rounded-bl-none"
                                                }`}
                                        >
                                            <p className="text-sm md:text-base break-words">{decryptedMessage}</p>
                                            <p className="text-xs text-right opacity-60 mt-1">
                                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>

    );
};

export default ChatHistory;