

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import useAuth from '../useAuth';

function useScheduleData() {

    const { user, loading, setLoading } = useAuth();
    const apiCall = useAxiosSecure();

    const {isLoading,isError,data:scheduleData=[]} = useQuery({
        queryKey:['schedule',user?.email],
        queryFn: async ()=>{
            const res = await apiCall.get(`/schedule-collections/${user?.email}`)
            return res?.data

        }

    });

  return {isLoading,isError,scheduleData};
}

export default useScheduleData