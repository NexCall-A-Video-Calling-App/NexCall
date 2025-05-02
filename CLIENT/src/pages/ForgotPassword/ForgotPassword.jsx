import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import toast from "react-hot-toast";
import dot from "../../assets/dot.png";

const ForgotPassword = () => {
  const location = useLocation();
  const [defaultEmail, setDefaultEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromQuery = params.get("email");

    if (emailFromQuery && validateEmail(emailFromQuery)) {
      setDefaultEmail(emailFromQuery);
    } else {
      toast.error("Please enter a valid email first.");
      navigate("/sign-in");
    }
  }, [location]);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmitReset = async () => {
    try {
      await sendPasswordResetEmail(auth, defaultEmail);
      toast.success("Password reset link sent to your email!");
      navigate("/sign-in");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#151515] py-10 px-2 min-h-screen">
      <div className="relative max-w-[992px] w-full bg-[#0f131c] p-7 md:p-10 lg:p-16 shadow-lg rounded-lg overflow-hidden border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 max-w-4xl w-full items-center md:flex md:flex-row-reverse">

          {/* Right Section - Motivational Message */}
          <div className="text-center md:text-left p-6 order-1 md:order-none mt-12 md:mt-0">
            <div className="flex items-center justify-center md:justify-start">
              <span className="h-[1px] bg-gradient-to-r from-[#32c6fc] to-[#8659d3] w-[20%]"></span>
              <span className="text-purple-600 text-5xl font-semibold italic w-[10%] text-center mt-4">“</span>
              <span className="h-[1px] bg-gradient-to-l from-[#32c6fc] to-[#8659d3] w-[70%]"></span>
            </div>
            <p className="bg-gradient-to-l from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent text-lg font-semibold">
              Reset your <span className="font-bold italic underline">password</span> and regain access to your team.
            </p>
            <div className="flex items-center justify-center md:justify-start">
              <span className="h-[1px] bg-gradient-to-l from-[#32c6fc] to-[#8659d3] w-[70%]"></span>
              <span className="text-[#32c6fc] text-5xl font-semibold italic w-[10%] text-center mt-4">“</span>
              <span className="h-[1px] bg-gradient-to-r from-[#32c6fc] to-[#8659d3] w-[20%]"></span>
            </div>
          </div>

          {/* Left Section - Reset Form */}
          <div className="bg-[#151515] p-4 lg:p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto z-20 order-2 md:order-none border border-gray-800">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-300">Reset Password</h2>
              <p className="text-gray-400 text-sm mb-4">We'll send a reset link to your email</p>
            </div>

            <label className="block text-gray-300 text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              value={defaultEmail}
              readOnly
              className="w-full p-2 border border-gray-800 bg-gray-900 text-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#32c6fc]"
            />

            <button
              type="button"
              onClick={handleSubmitReset}
              className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] px-6 py-2 rounded text-white font-medium hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 w-full mt-5"
            >
              Send Reset Link
            </button>
          </div>
        </div>

        {/* Corner Designs */}
        <div className="absolute top-0 left-0 bg-gradient-to-l from-[#32c6fc] to-[#8659d3] w-44 h-20 rounded-tl-lg"></div>
        <div className="absolute bottom-0 right-0 bg-gradient-to-r from-[#32c6fc] to-[#8659d3] w-52 h-28 rounded-br-lg "></div>

        {/* Dot Image */}
        <img src={dot} alt="Doted..." className="absolute -bottom-[20px] md:bottom-4 lg:bottom-8 -left-5 md:left-[330px] lg:left-[400px]" />
      </div>
    </div>
  );
};

export default ForgotPassword;


