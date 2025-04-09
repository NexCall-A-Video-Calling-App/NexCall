

import { useQuery } from '@tanstack/react-query'
import React from 'react'

function useScheduleData() {

    const { user, loading, setLoading } = useAuth();

    const {isLoading,data:scheduleData=[]} = useQuery({
        queryKey:['schedule',]

    })
  return (
    <div>




    </div>
  )
}

export default useScheduleData