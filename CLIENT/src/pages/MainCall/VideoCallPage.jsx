import { useEffect, useRef, useState } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
  selectLocalPeer,
  selectPeers,
  selectPeerMetadata,
  selectPeerCount,
} from "@100mslive/react-sdk";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaSignOutAlt,
  FaUsers,
  FaComments,
  FaChalkboardTeacher,
  FaDesktop,
  FaHandPaper,
} from "react-icons/fa";
import toast from "react-hot-toast";

const VideoCallPage = ({ initialRoomId, onClose }) => {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const localPeer = useHMSStore(selectLocalPeer);
  const peers = useHMSStore(selectPeers);
  const peerCount = useHMSStore(selectPeerCount);
  const [error, setError] = useState("");
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [raisedHands, setRaisedHands] = useState([]);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const localVideoRef = useRef(null);
  const videoRefs = useRef({});

  useEffect(() => {
    if (initialRoomId && !isConnected) {
      joinRoom(initialRoomId);
    }
    return () => {
      if (isConnected) hmsActions.leave().then(() => window.close());
    };
  }, [initialRoomId, isConnected]);

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
  }, []);

  const joinRoom = async (roomId) => {
    try {
      const response = await fetch(
        `https://nexcall.up.railway.app/token?roomId=${encodeURIComponent(roomId)}`
      );
      if (!response.ok) throw new Error(`Failed to fetch token: ${response.statusText}`);
      const { token } = await response.json();

      await hmsActions.join({
        userName: `User-${Math.random().toString(36).substring(7)}`,
        authToken: token,
        settings: { isAudioMuted: true, isVideoMuted: false },
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

  const raiseHand = async () => {
    const meta = localPeer.metadata ? JSON.parse(localPeer.metadata) : {};
    meta.handRaised = true;
    await hmsActions.updatePeerMetadata(JSON.stringify(meta));
    toast("Hand Raised ✋");
  };

  const toggleScreenShare = async () => {
    await hmsActions.setScreenShareEnabled(!isSharingScreen);
    setIsSharingScreen(!isSharingScreen);
  };

  const muteAll = async () => {
    for (const peer of peers) {
      if (!peer.isLocal && peer.audioTrack) {
        await hmsActions.setRemoteTrackEnabled(peer.audioTrack, false);
      }
    }
    toast.success("All participants muted");
  };

  const openChat = () => {
    const chatWindow = window.open(
      "/chat",
      "ChatWindow",
      "width=400,height=600,resizable=yes"
    );
    if (chatWindow) {
      chatWindow.focus();
    }
  };

  const lowerHand = async (peerId) => {
    const peer = peers.find((p) => p.id === peerId);
    if (peer) {
      const meta = peer.metadata ? JSON.parse(peer.metadata) : {};
      meta.handRaised = false;
      await hmsActions.updatePeerMetadata(meta, peerId);
      toast.success(`Lowered hand of ${peer.name}`);
    }
  };

  return (
    <div className="space-y-4 flex flex-col items-center justify-center min-h-screen p-4 text-white">
      {error && <div className="text-red-300 font-semibold">{error}</div>}
      {!isConnected && <p className="text-lg animate-pulse">Connecting...</p>}
      {isConnected && (
        <div className="w-full max-w-7xl">
          <div className="flex justify-center items-center gap-2 text-sm mb-4">
            <FaUsers className="text-xl" />
            <span>{peerCount} Participants</span>
          </div>

          {raisedHands.length > 0 && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded mb-4">
              Raised Hands:{" "}
              {raisedHands.map((peer) => (
                <button
                  key={peer.id}
                  className="ml-2 text-sm text-blue-600 underline"
                  onClick={() => lowerHand(peer.id)}
                >
                  {peer.name} ❌
                </button>
              ))}
            </div>
          )}

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {localPeer && !peers.some((p) => p.isLocal) && (
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
            {peers.map((peer) => (
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
                  muted={peer.isLocal}
                  className="w-full h-full object-cover"
                />
                <p className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {peer.name}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-3 flex-wrap">
            <button onClick={toggleAudio} className="bg-[#8659d3] hover:bg-[#7744cc] p-3 rounded-full shadow-md">
              {isAudioMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
            <button onClick={toggleVideo} className="bg-[#8659d3] hover:bg-[#7744cc] p-3 rounded-full shadow-md">
              {isVideoMuted ? <FaVideoSlash /> : <FaVideo />}
            </button>
            <button onClick={leaveRoom} className="bg-red-600 hover:bg-red-700 p-3 rounded-full shadow-md">
              <FaSignOutAlt />
            </button>
            <button onClick={raiseHand} className="bg-yellow-500 hover:bg-yellow-600 p-3 rounded-full shadow-md">
              ✋
            </button>
            <button onClick={toggleScreenShare} className="bg-green-600 hover:bg-green-700 p-3 rounded-full shadow-md">
              <FaDesktop />
            </button>
            <button onClick={openChat} className="bg-[#9333ea] hover:bg-[#7e2cd4] p-3 rounded-full shadow-md">
              <FaComments />
            </button>
            <button onClick={muteAll} className="bg-black hover:bg-gray-800 p-3 rounded-full shadow-md">
              <FaChalkboardTeacher />
            </button>
          </div>
        </div>
      )}
    </div>
  );

};

export default VideoCallPage;
