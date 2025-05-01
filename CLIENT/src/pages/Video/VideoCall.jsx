import { useLocation } from "react-router-dom"; 
import VideoCallPage from "../MainCall/VideoCallPage";

const VideoCall = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("roomId");
  const userName = queryParams.get("userName") || "Anonymous";
  const photoURL = queryParams.get("photoURL") || "Anonymous";

  return (
    <div>
      <VideoCallPage initialRoomId={roomId} userName={userName} photoURL={photoURL}/>
    </div>
  );
};

export default VideoCall;