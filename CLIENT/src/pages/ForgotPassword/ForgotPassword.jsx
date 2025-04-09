
// import { useForm } from "react-hook-form";
const ForgotPassword = () => {
    // const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
            <p className="text-sm text-gray-600 text-center mb-6">Enter your email address to receive a password reset link.</p>
           
        </div>
    </div>
    );
};

export default ForgotPassword;