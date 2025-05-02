import { useEffect, useRef, useState } from "react";
import { useHMSActions, useHMSStore, selectIsConnectedToRoom, selectLocalPeer, selectPeers, selectPeerCount } from "@100mslive/react-sdk";
import { FaUsers, FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaSignOutAlt } from "react-icons/fa";
import { LuAlarmClockMinus } from "react-icons/lu";
import { toast } from "react-hot-toast";

const VideoCallPage = ({ initialRoomId, userName, photoURL, onClose = () => { } }) => {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const localPeer = useHMSStore(selectLocalPeer);
  const peers = useHMSStore(selectPeers);
  const peerCount = useHMSStore(selectPeerCount);
  const [error, setError] = useState("");
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [raisedHands, setRaisedHands] = useState([]);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const localVideoRef = useRef(null);
  const videoRefs = useRef({});
  console.log("Photo: ", photoURL);
  // Timer logic
  useEffect(() => {
    if (!isConnected) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        console.log(`Time left: ${newTime} seconds`); // Debug log

        // Show warning at 3 minutes (180 seconds)
        if (newTime === 180 && !showWarning) {
          setShowWarning(true);
          toast("Meeting will end in 2 minutes!", {
            duration: 5000,
            icon: "⚠️",
          });
        }

        // Leave meeting at 0 seconds
        if (newTime <= 0) {
          console.log("Leaving meeting: time up"); // Debug log
          hmsActions.leave();
          window.close();
          onClose();
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isConnected, hmsActions, onClose]);

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (initialRoomId && !isConnected) {
      joinRoom(initialRoomId);
    }
    return () => {
      if (isConnected) hmsActions.leave().then(() => window.close());
    };
  }, [initialRoomId, isConnected, hmsActions]);

  useEffect(() => {
    if (localPeer?.videoTrack && localVideoRef.current) {
      hmsActions.attachVideo(localPeer.videoTrack, localVideoRef.current);
    }
  }, [localPeer, hmsActions]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedPeers = await hmsActions.getPeers();
      const raised = updatedPeers.filter(
        (peer) => peer.metadata && JSON.parse(peer.metadata)?.handRaised
      );
      setRaisedHands(raised.map((peer) => ({ id: peer.id, name: peer.name })));
    }, 1000);
    return () => clearInterval(interval);
  }, [hmsActions]);

  const joinRoom = async (roomId) => {
    try {
      const response = await fetch(
        `https://nexcall-vfak.onrender.com/api/token?roomId=${encodeURIComponent(roomId)}`
      );
      if (!response.ok) throw new Error(`Failed to fetch token: ${response.statusText}`);
      const { token } = await response.json();
      await hmsActions.join({
        userName: userName || `User-${Math.random().toString(36).substring(7)}`,
        authToken: token,
        settings: { isAudioMuted: true, isVideoMuted: true },
        metaData: JSON.stringify({ handRaised: false }),
      });
      setError("");
    } catch (error) {
      console.error("Error joining room:", error);
      setError("Failed to join room: " + error.message);
      toast.error("Failed to join room: " + error.message);
    }
  };

  const leaveRoom = () => {
    hmsActions.leave();
    window.close();
    onClose();
  };

  const toggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(isAudioMuted);
    setIsAudioMuted(!isAudioMuted);
  };

  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(isVideoMuted);
    setIsVideoMuted(!isVideoMuted);
  };

  const toggleScreenShare = async () => {
    await hmsActions.setScreenShareEnabled(!isSharingScreen);
    setIsSharingScreen(!isSharingScreen);
  };

  return (
    <div className={`space-y-4 flex flex-col items-center justify-center min-h-screen p-4 text-white bg-[#151515]`}>
      {error && <div className="text-red-300 font-semibold">{error}</div>}
      {!isConnected && <p className="text-lg animate-pulse">Connecting...</p>}
      {isConnected && (
        <div className="w-full max-w-7xl relative">
          {/* Countdown Timer */}
          <div className="flex justify-center items-center gap-3 w-full">
            <div className="flex justify-center items-center gap-2 text-sm">
              <FaUsers className="text-xl" />
              <span>{peerCount} Participants</span>
            </div>
            <div className={`${showWarning ? 'bg-red-600' : 'bg-black'} flex justify-center gap-1 items-center bg-opacity-50 text-white text-sm px-3 py-1 rounded m-2`}>
              <LuAlarmClockMinus />
              <p>Time Left: {formatTime(timeLeft)}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {localPeer && (
              <div className="relative bg-white/10 rounded-xl overflow-hidden shadow-md backdrop-blur-sm h-[250px]">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <p className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {localPeer.name} (You)
                </p>
              </div>
            )}
            {peers
              .filter((peer) => !peer.isLocal)
              .map((peer) => (
                <div
                  key={peer.id}
                  className="relative bg-white/10 rounded-xl overflow-hidden shadow-md backdrop-blur-sm h-[250px]"
                >
                  <video
                    ref={(ref) => {
                      if (ref && peer.videoTrack) {
                        hmsActions.attachVideo(peer.videoTrack, ref);
                        videoRefs.current[peer.id] = ref;
                      }
                    }}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <p className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {peer.name}
                  </p>
                </div>
              ))}
          </div>

          <div className="flex justify-center mt-6 gap-3 flex-wrap">
            <button onClick={toggleAudio} className="bg-gray-800 text-white p-2 text-xl">
              {isAudioMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
            <button onClick={toggleVideo} className="bg-gray-800 text-white p-2 text-xl">
              {isVideoMuted ? <FaVideoSlash /> : <FaVideo />}
            </button>
            <button onClick={toggleScreenShare} className="bg-gray-800 text-white p-2 text-xl">
              <FaDesktop />
            </button>
            <button onClick={leaveRoom} className="bg-gray-800 text-white p-2 text-xl">
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCallPage;