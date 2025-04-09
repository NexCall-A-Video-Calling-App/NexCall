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
                <div key={idx} className="mb-8 border border-gray-200 p-4 rounded-xl shadow-sm bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-purple-700">
                            Room ID: {room.room}
                        </h3>
                        <button
                            onClick={() => {
                                const decryptedMessages = room.messages.map((msg) => ({
                                    ...msg,
                                    message: decryptMessage(msg.message)
                                }));

                                downloadMessagesAsPDF(room.room, decryptedMessages);
                            }}
                            className="flex items-center text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
                        >
                            <RiChatDownloadLine className="mr-1" />
                            Download
                        </button>
                    </div>

                    <div className="max-h-96 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-200">
                        {room.messages.map((msg, i) => {
                            const isSender = msg.senderEmail === user?.email;
                            const decryptedMessage = decryptMessage(msg.message);

                            return (
                                <div
                                    key={i}
                                    className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`flex items-start space-x-2 max-w-md p-2 rounded-lg shadow-sm ${isSender
                                            ? "bg-blue-500 text-white flex-row-reverse"
                                            : "bg-white border text-black"
                                            }`}
                                    >
                                        <img
                                            src={msg.photo}
                                            alt="user"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold">{msg.senderName}</p>
                                            <p className="text-sm break-words">{decryptedMessage}</p>
                                            <p className="text-xs opacity-70">
                                                {new Date(msg.timestamp).toLocaleString()}
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