# [📞 NexCall: A Secure Communication Platform](https://assignment-11-1f30f.web.app/) 

## 🗏️ Description
**NexCall** is a next-generation, full-stack **secure video communication platform** built to empower real-time collaboration. Designed for professionals, educators, healthcare providers, and remote teams, NexCall brings together seamless **one-on-one and group video calling**, **screen sharing**, **instant messaging**, and **chat history management** in a web-based environment.

The platform enables users to:
- Conduct private or group video and audio calls with minimal latency.
- Share screens to present, teach, or collaborate more effectively.
- Communicate via real-time messaging during and outside meetings.
- Download chat histories for offline reference or compliance purposes.

**Key features include:**
- **One-on-One and Group Video Calls**: Reliable peer-to-peer HD communication.
- **Screen Sharing**: Present documents, apps, or entire screens during calls.
- **Real-Time Chat**: Message participants instantly with auto-saving chats.
- **Secure Authentication**: Login via Firebase Auth (Email/Password, Google login).
- **Responsive Dashboard**: Manage meetings, chats, and settings across devices.
- **Connection Stability**: Auto reconnection for network dropouts.
- **Dynamic Meeting Links**: Instantly generate sharable meeting URLs.
- **Downloadable Chat History**: Export chats for review or record-keeping.
- **Mute/Unmute & Video Control**: Full control over microphone and camera during calls.
- **Mobile Friendly**: Optimized design for smartphones, tablets, and desktops.

## ⚙️ Technologies Used
- **React.js** for building the user interface.
- **Firebase Authentication** for secure login and registration.
- **Firebase Hosting** and **Railway.com** for deployment.
- **MongoDB** for scalable, document-based database management.
- **Node.js** and **Express.js** for backend server and API development.
- **Socket.io** for real-time communication (signaling, messaging).
- **WebRTC** for peer-to-peer video/audio and screen sharing.
- **DaisyUI** and **Tailwind CSS** for rapid, beautiful styling.
- **React Toastify** for dynamic toast alerts and Notification.
- **Crypto.js** for chat data security and encryption.
- **JS PDF** for making the chats in pdf format
- **100ms SDK** and **ZegoCloud** as experimental integrations for future scalability.
- **React Hooks** (`useState`, `useEffect`, `useContext`, `useNavigate`, `useLocation`) for state and side effect management.
- **React Router** for SPA routing. 
- **Animation Libraries**: **Lottie React**, **React Awesome Reveal**, **React Super Responsive Table** for better UI/UX.

---

### ⭐ Key Features

1. **Real-Time Secure Video Calls**:
   - High-quality, peer-to-peer one-on-one and group video/audio communication using WebRTC.
   - Dynamic bandwidth adjustment for stable call quality.

2. **Screen Sharing**:
   - Present your screen during meetings effortlessly.
   - Seamless switch between screen sharing and webcam.

3. **Real-Time Messaging System**:
   - Send and receive instant messages during meetings.
   - All chat conversations are auto-saved to the database securely.

4. **Chat Downloading**:
   - Download chat history at the end of a meeting for personal or business records.

5. **Dynamic Room Creation**:
   - Create private or public meeting rooms with unique, sharable links.
   - Instant join without complicated setup.

6. **Mute/Unmute and Video Controls**:
   - Participants can toggle their mic and camera any time during a call.

7. **Authentication System**:
   - Email/password authentication.
   - Google OAuth social login.
   - Firebase authentication for easy, secure user management.

8. **Dashboard Management**:
   - View and manage created meetings.
   - View chat history logs and download conversations.

9. **Responsive and Mobile First**:
   - Fully responsive for different screen sizes.
   - Optimized UI for better mobile usability.

10. **Enhanced Security & Reconnection**:
    - Chat encryption via Crypto.js.
    - Automatic reconnection handling with socket.io in case of network drops.

---

## 🚀 Live Link
- **Coming Soon**

_(Deployment and hosting on Firebase and Vercel are planned. Will update link after live release.)_

---

## 🔧 Development Practices
- **GitHub Commits**: Maintained organized commit structure with clear messages for each feature or fix.
- **Environment Variables**: Used `.env` files to secure sensitive information like API keys and Database URIs.
- **Error Handling**: Implemented friendly toast notifications and modals for user feedback instead of alerts.
- **Hosting Strategy**: 
  - **Client Side**: Firebase Hosting.
  - **Server Side**: Vercel Hosting.
- **WebRTC Signaling**: Efficient socket connection design for room joining, call offering, answering, and ICE candidate exchanges.
- **Code Modularity**: Divided components for easy maintenance, scalability, and testing.
- **Future Scalability**:
  - Plan to integrate **TURN servers** for better NAT traversal.
  - Add **Recording** feature using WebRTC MediaRecorder API.
  - Explore **End-to-End Encryption** at the media layer.

---

## 🌟 Target Audience
- **Corporate Teams** needing private, secure video meetings.
- **Educators and Institutions** conducting remote learning.
- **Healthcare Professionals** for secure telemedicine consultations.
- **Freelancers and Remote Workers** collaborating virtually.

---

## 📈 Future Improvements
- **Meeting Scheduling**: Allow users to schedule meetings and send invites.
- **Meeting Recording**: Record and download meeting sessions.
- **Push Notifications**: Alert users for incoming meeting invitations.
- **Whiteboard Collaboration**: Add collaborative whiteboard for group work sessions.
- **AI Features**: Smart meeting summaries, automatic note-taking.

---

# 🌟 Conclusion
**NexCall** isn't just a video calling tool — it's a **comprehensive virtual collaboration platform** for the future of remote work, learning, and telehealth.  
With real-time communication, scalability, and security at its core, NexCall is ready to grow with the evolving needs of its users.
