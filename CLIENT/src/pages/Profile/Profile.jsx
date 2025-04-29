import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdUpgrade } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { IoMdClose } from "react-icons/io";

const ProfileDetails = () => {
  const { user, profileUpdate } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = async () => {
    if (isEditing) {
      if (!formData.displayName.trim()) {
        toast.error("Name cannot be empty!");
        return;
      }

      try {
        await profileUpdate(formData.displayName, formData.photoURL);
        toast.success("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
    }
    setIsEditing(false);
  };


  const handleUpgradePlan = () => {
    toast("Upgrade feature is coming soon!", {
      icon: "🚀",
      style: {
        borderRadius: '8px',
        background: '#333',
        color: '#fff',
      },
    });
  };


  return (
    <div className="max-w-3xl mx-auto mt-28 mb-12 p-8 bg-white shadow-md rounded-2xl border border-gray-200">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-5">
          <img
            src={formData.photoURL || "https://i.ibb.co.com/5gDBVLDV/images.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-[3px] border-purple-300 object-cover shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{formData.displayName || "User Name"}</h2>
            <p className="text-sm text-gray-500 bg-green-200 rounded-full text-center border">{user?.plan || "Basic Plan"}</p>
          </div>
        </div>

        <button onClick={handleUpgradePlan}>
          <Link
            // to="/pricing"
            className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200 shadow-md"
          >
            <MdUpgrade className="text-xl" />
            Upgrade Plan
          </Link>
        </button>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            id="displayName"
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${isEditing
              ? "bg-white border-purple-400 focus:ring-2 focus:ring-purple-300"
              : "bg-gray-100 border-gray-300 cursor-not-allowed"
              }`}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 border-gray-300 cursor-not-allowed"
          />
        </div>

        {/* Photo URL */}
        <div className="md:col-span-2">
          <label htmlFor="photoURL" className="block text-sm font-medium text-gray-600 mb-1">
            Photo URL
          </label>
          <input
            id="photoURL"
            type="text"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${isEditing
              ? "bg-white border-purple-400 focus:ring-2 focus:ring-purple-300"
              : "bg-gray-100 border-gray-300 cursor-not-allowed"
              }`}
          />
        </div>

        {/* Button */}
        <div className="md:col-span-2 flex justify-center items-center gap-4">
          <button
            onClick={handleToggleEdit}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition duration-200 shadow-md ${isEditing
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-purple-500 text-white hover:bg-purple-600"
              }`}
          >
            <FaEdit />
            {isEditing ? "Update Profile" : "Edit Profile"}
          </button>

          {isEditing && (
            <button
              onClick={handleCancelEdit}
              className="flex items-center gap-1 px-6 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-200 shadow-md font-  bold"
            >
              <IoMdClose size={21} /> Cancel Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
