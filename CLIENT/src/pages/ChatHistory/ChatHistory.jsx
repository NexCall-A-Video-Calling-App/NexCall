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

                    <div className="max-h-96 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
  {room.messages.map((msg, i) => {
    const isSender = msg.senderEmail === user?.email;
    const decryptedMessage = decryptMessage(msg.message);

    return (
      <div
        key={i}
        className={`flex ${isSender ? "justify-end" : "justify-start"}`}
      >
        <div className={`flex items-end max-w-xs sm:max-w-sm md:max-w-md space-x-2 ${isSender ? "flex-row-reverse" : ""}`}>
          <img
            src={msg.photo}
            alt="user"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className={`relative p-3 rounded-2xl ${isSender
            ? "bg-primary text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
            }`}
          >
            <p className="font-medium">{msg.senderName}</p>
            <p className="text-sm break-words">{decryptedMessage}</p>
            <p className="text-xs text-right opacity-60 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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