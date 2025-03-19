


import React from 'react'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

function UseUserinBellicon() {

    const {isLoading,error,refetch,data:belIconUserData=[] }= useQuery({

        queryKey:['userdata'],
        queryFn: async () =>{
            const res = await fetch('http://localhost:5000/users')
            return res;
        }

    })







  return {isLoading,error,refetch,belIconUserData}
}

export default UseUserinBellicon