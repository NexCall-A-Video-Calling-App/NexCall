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
        `http://localhost:5000/token?roomId=${encodeURIComponent(roomId)}`
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

  // leave room and close the window
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
    <div className="space-y-4 flex flex-col items-center justify-center min-h-screen p-4">
      {error && <div className="text-red-500">{error}</div>}
      {!isConnected && <p>Connecting...</p>}
      {isConnected && (
        <div className="w-full">
          <div className="flex justify-center items-center gap-2 text-white text-sm mb-2">
            <div className="flex items-center gap-2">
              <FaUsers className="text-xl" />
              <span>{peerCount} Participants</span>
            </div>
          </div>

          {raisedHands.length > 0 && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded mb-4">
              Raised Hands: {" "}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            {localPeer && !peers.some((p) => p.isLocal) && (
              <div className="relative">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full rounded-lg shadow-md"
                />
                <p className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                  {localPeer.name} (You)
                </p>
              </div>
            )}
            {peers.map((peer) => (
              <div key={peer.id} className="relative">
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
                  className="w-full rounded-lg shadow-md"
                />
                <p className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                  {peer.name}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-4 flex-wrap">
            <button onClick={toggleAudio} className="text-white bg-blue-500 p-3 rounded-full">
              {isAudioMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
            <button onClick={toggleVideo} className="text-white bg-blue-500 p-3 rounded-full">
              {isVideoMuted ? <FaVideoSlash /> : <FaVideo />}
            </button>
            <button onClick={leaveRoom} className="text-white bg-red-500 p-3 rounded-full">
              <FaSignOutAlt />
            </button>
            <button onClick={raiseHand} className="text-white bg-yellow-500 p-3 rounded-full text-sm">
              ✋
            </button>
            <button onClick={toggleScreenShare} className="text-white bg-green-600 p-3 rounded-full">
              <FaDesktop />
            </button>
            <button onClick={openChat} className="text-white bg-purple-500 p-3 rounded-full">
              <FaComments />
            </button>
            <button onClick={muteAll} className="text-white bg-black p-3 rounded-full">
              <FaChalkboardTeacher />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCallPage;
