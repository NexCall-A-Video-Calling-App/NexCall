
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";  
const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { resetPassword } = useContext(AuthContext); 
    const onSubmit = data => {
        resetPassword(data.email)
            .then(() => {
                toast.success("Password reset email sent!");
            })
            .catch(err => {
                toast.error(err.message);
            });
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
            <p className="text-sm text-gray-600 text-center mb-6">Enter your email address to receive a password reset link.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Email address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}

                    <button type="submit" className="w-full bg-purple-600 text-white py-2 mt-4 rounded-lg hover:bg-purple-700">
                        Send Reset Link
                    </button>
                </form> 
        </div>
    </div>
    );
};

export default ForgotPassword;