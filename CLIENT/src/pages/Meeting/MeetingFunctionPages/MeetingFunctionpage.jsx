


import React, { useEffect, useState } from 'react'
import { GoDeviceCameraVideo } from "react-icons/go";
import { Gi3dGlasses, GiTimeTrap } from "react-icons/gi";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsFillCameraReelsFill } from "react-icons/bs"


const MeetingFunctionpage = () => {
    // main function go under navbar 

    const [ time , settime ] = useState("");
    const [ fullTime , setfullTime ] = useState("");

    useEffect(()=>{
        // use effect work when side effect like api calling 
        const callTime = setInterval(()=>{
          settime(moment().format('LTS'));
          setfullTime(moment().format('MMMM Do YYYY'))
        },1000);
    
        return ()=> {clearInterval(callTime)}
    
      })
  return (
    <div>
      
      

    </div>
  )
}

export default MeetingFunctionpage
