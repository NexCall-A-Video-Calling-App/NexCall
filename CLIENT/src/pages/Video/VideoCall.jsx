import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import VideoCallPage from "../MainCall/VideoCallPage";


const VideoCall = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("roomId");

  useEffect(() => {
    console.log("Video call started with roomId:", roomId);
  }, [roomId]);

  return (
    <div>
      <VideoCallPage initialRoomId={roomId} />
    </div>
  );
};

export default VideoCall;