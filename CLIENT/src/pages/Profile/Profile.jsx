import { FaEdit } from "react-icons/fa";
import { MdUpgrade } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";

const ProfileDetails = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(()=>{
    if(showEditProfile){
      setLoading(true);
      const timer = setTimeout(()=>{
        setLoading(false);
      }, 2000);
      return ()=> clearTimeout(timer);
    }
  },[showEditProfile])

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL || "https://i.ibb.co.com/5gDBVLDV/images.png"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <h2 className="mt-3 text-xl font-semibold">{user?.displayName || "User Name"}</h2>
        <p className="text-gray-500">{user?.email || "user@gmail.com"}</p>
        <p className="text-gray-500">{user?.plan || "Basic Plan"}</p>
      </div>

      <div className="mt-4 flex flex-col md:flex-row justify-between gap-4">
        <div className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          <button 
          onClick={() => setShowEditProfile(!showEditProfile)}
          className="flex items-center gap-2 ">
            <FaEdit /> {showEditProfile ? "Close Editor" : "Edit Profile"}
            </button>
        </div>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          <Link className="flex items-center gap-2 " to={'/pricing'}><MdUpgrade className="text-2xl font-extrabold" /> Upgrade Plan</Link>
        </button>
      </div>
      {/* show edit profile component */}
      {showEditProfile && (
        loading ? <div className="flex justify-center"><Spinner /></div> : <div className="mt-4">
        <EditProfile />
      </div>
        
      )
}
    </div>
  );
};

export default ProfileDetails;
