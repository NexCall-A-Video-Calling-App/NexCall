import { useQuery } from "@tanstack/react-query";
import React from 'react';
import { RiChatDownloadLine } from 'react-icons/ri';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ChatHistory = () => {
    const axios = useAxiosSecure();

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
        <div className='text-7xl bg-red-500'>
            ChatHistory
        </div>
    );
};

export default ChatHistory;