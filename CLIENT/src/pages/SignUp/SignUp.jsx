import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import dot from '../../assets/dot.png'
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const { createUser, loginWithGoogle } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate()

    // Sign Up
    const onSubmit = async (data) => {
        console.log(data.email, data.password);

        createUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);
                navigate('/dashboard')
                // navigate('/meeting-page')
                reset();
            })
            .catch((error) => {
                console.log(error.message);
            })
    };

    // Google Sign In
    const signInWithGoogle = () => {
        console.log("Google Sign In");
        loginWithGoogle()
            .then((result) => {
                console.log(result.user);
                navigate('/dashboard')
                // navigate('/meeting-page')
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-2">
            <div className="relative max-w-[992px] w-full bg-white p-7 md:p-10 lg:p-16 shadow-lg rounded-lg overflow-hidden border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 max-w-4xl w-full items-center md:flex md:flex-row-reverse">

                    {/* Right Section - Promotional Message */}
                    <div className="text-center md:text-left p-6 order-1 md:order-none mt-12 md:mt-0">
                        <div className="flex items-center justify-center md:justify-start">
                            <span className="h-[1px] bg-purple-500 w-[20%]"></span>
                            <span className="text-purple-600 text-5xl font-semibold italic w-[10%] text-center mt-4">“</span>
                            <span className="h-[1px] bg-purple-500 w-[70%]"></span>
                        </div>
                        <p className="text-purple-700 text-lg font-semibold">
                            Join NexCall to <span className="font-bold italic underline">simplify</span> your communication, schedule meetings effortlessly, and stay connected with your team in real-time.
                        </p>
                        <div className="flex items-center justify-center md:justify-start">
                            <span className="h-[1px] bg-purple-500 w-[70%]"></span>
                            <span className="text-purple-600 text-5xl font-semibold italic w-[10%] text-center mt-4">“</span>
                            <span className="h-[1px] bg-purple-500 w-[20%]"></span>
                        </div>
                    </div>

                    {/* Left Section - Signup Form */}
                    <div className="bg-white p-4 lg:p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto z-20 order-2 md:order-none border">
                        <h2 className="text-2xl font-bold text-center mb-2">Welcome</h2>
                        <p className="text-gray-600 text-center mb-4">Create an account on NexCall for free</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Name Field */}
                            <label className="block text-gray-700 text-sm font-semibold mb-1"> Name</label>
                            <input
                                type="text" id="name"
                                placeholder="Enter your name"
                                {...register("name", { required: "Name is required" })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 "
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            {/* Email Field */}
                            <label className="block text-gray-700 text-sm font-semibold mb-1 mt-2">Email</label>
                            <input
                                type="email" id="email"
                                placeholder="Enter your email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 "
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            {/* Password Field */}
                            <label className="block text-gray-700 text-sm font-semibold mb-1 mt-2">Password</label>
                            <input
                                type="password" id="password"
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required" })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 mt-3">
                                Sign Up
                            </button>
                        </form>

                        {/* Google Sign In */}
                        <div className="text-center my-2 text-gray-500">OR</div>
                        <button onClick={signInWithGoogle} className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg mb-2 hover:bg-red-600">
                            <span className="mr-2">
                                <FaGoogle />
                            </span>
                            Sign up with Google
                        </button>
                        <p className="text-center text-gray-600 mt-4">
                            Already have an account? <Link to="/sign-in"><span className="text-purple-600 cursor-pointer font-semibold">Sign in</span></Link>
                        </p>
                    </div>
                </div>

                {/* Doted Image */}
                <div className="absolute top-0 right-0 bg-purple-500 w-44 h-20 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 bg-purple-500 w-52 h-28 rounded-bl-lg "></div>
                <img src={dot} alt="Doted..." className="absolute -bottom-[126px] md:-bottom-28 lg:-bottom-24 -right-2 md:right-[320px] lg:right-[440px]" />
            </div>
        </div>
    );
};

export default SignUp;
