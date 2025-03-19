


import React, { useState } from 'react'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios'

function UseUserinBellicon() {

    const [data , setdata] =useState("");
    
    fetch('http://localhost:5000/users')
    .then((res)=> res.json())
    .then((data)=> console.log(data));

    const {isLoading,error,refetch,data:belIconUserData=[] }= useQuery({


        queryKey:['userdata'],
        queryFn: async () =>{

            const res = await axios.get('http://localhost:5000/users')

            console.log(res);
            
            return res.data;
        }

    })
    console.log(belIconUserData,"bel user")






  return {isLoading,error,refetch,belIconUserData}
}

export default UseUserinBellicon