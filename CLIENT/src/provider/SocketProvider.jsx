import React, { createContext, useState, useMemo, useEffect } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io.connect("http://localhost:5000"), []);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [UserId, setUserId] = useState(null);  // Client Socket ID 

    useEffect(() => {
        socket.on("connect", () => {
            setUserId(socket.id);
            console.log("Socket connected, My ID:", socket.id);
        });

        socket.on("RoomCreated", (roomId) => {
            setCurrentRoom(roomId);
            console.log("RoomCreated received:", roomId);
        });
        socket.on("RoomJoined", (roomId) => {
            setCurrentRoom(roomId);
            console.log("RoomJoined received:", roomId);
        });

        return () => {
            socket.off("connect");
            socket.off("RoomCreated");
            socket.off("RoomJoined");
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, currentRoom, setCurrentRoom, UserId }}>
            {children}
        </SocketContext.Provider>
    );
};