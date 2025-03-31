import { FaEdit } from "react-icons/fa";
import { MdUpgrade } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const ProfileDetails = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl h-screen mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL || "https://i.ibb.co/mFvskD5/icons8-avatars-48.png"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <h2 className="mt-3 text-xl font-semibold">{user?.displayName || "User Name"}</h2>
        <p className="text-gray-500">{user?.email || "user@gmail.com"}</p>
        <p className="text-gray-500">{user?.plan || "Basic Plan"}</p>
      </div>
      
      <div className="mt-4 flex flex-col md:flex-row justify-between gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          <Link className="flex items-center gap-2 " to={'/editProfile'}><FaEdit /> Edit Profile</Link>
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          <Link className="flex items-center gap-2 " to={'/pricing'}><MdUpgrade className="text-2xl font-extrabold" /> Upgrade Plan</Link>
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
