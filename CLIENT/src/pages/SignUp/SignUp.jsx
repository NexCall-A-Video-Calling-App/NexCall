import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import dot from '../../assets/dot.png'
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useImageUpload from "../../hooks/useImageUpload";
import toast from "react-hot-toast";


const SignUp = () => {
    const { createUser, loginWithGoogle, profileUpdate } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { uploadImage } = useImageUpload();


    // Sign Up
    const onSubmit = async (data) => {
        console.log(data.email, data.password);

        //upload image
        const imageFile = data.photo[0];
        const photoURL = await uploadImage(imageFile);

        if (!photoURL) {
            toast.error("Image upload failed.");
            return;
        }

        createUser(data.email, data.password)
            .then((result) => {
                // console.log(result.user);
                toast.success("User created successfully.");
                profileUpdate(data.name, photoURL)
                console.log(data.name, photoURL);
                navigate('/meeting')
                reset();
            })
            .catch((error) => {
                // console.log(error.message);
                toast.error(error.message);
            })

    };

    // Google Sign In
    const signInWithGoogle = () => {
        console.log("Google Sign In");
        loginWithGoogle()
            .then((result) => {
                // console.log(result.user);
                toast.success("User created successfully.");
                navigate('/meeting')
            })
            .catch((error) => {
                // console.log(error.message);
                toast.error(error.message);
            })
    }

    return (
        <div className="flex justify-center items-center bg-gray-50 py-10 px-2">
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

                            {/* Upload Photo */}
                            <div className="form-control mb-3">
                                <label className="label text-sm font-semibold text-gray-700 mb-1 mt-2 ">Upload Photo</label>
                                <div className='flex items-center gap-5'>
                                    <div className='w-full'>
                                        <input type="file" {...register("photo", { required: true })} className="file-input file-input-bordered w-full rounded-lg" />


                                        {errors.photo && <p className='text-red-600'>Photo is required.</p>}
                                    </div>


                                </div>
                            </div>


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
                <img src={dot} alt="Doted..." className="absolute -bottom-[20px] md:bottom-4 lg:bottom-8 -right-5 md:right-[355px] lg:right-[485px]" />
            </div>
        </div>
    );
};

export default SignUp;
