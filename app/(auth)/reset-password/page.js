'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { sendOtp } from '@/app/helpers/backend';



const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const requestBody = {
            body: {
                identifier: email,
                action: "forget_password", 
            },
        };
        console.log("🚀 ~ handleSubmit ~ requestBody:", requestBody)
    
        const { success, message, data } = await sendOtp(requestBody);
    
        if (!success) {
            toast.error(message);
            setLoading(false);
        } else {
            router.push(`/reset-password/${email}`);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <Toaster position="top-center" reverseOrder={false} />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        {"Forgot Your Password?"}
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        {"Enter your registered email to receive a password reset OTP."}
                    </p>
                </div>
                {
                    <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full mt-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:outline-none transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={!loading ? { scale: 1.02 } : {}}
                            whileTap={!loading ? { scale: 0.98 } : {}}
                            disabled={loading}
                            className={`w-full text-white py-3 rounded-lg font-bold tracking-wide text-sm shadow-md transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                                }`}
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </motion.button>
                    </form>
                }

            </motion.div>
        </div>
    );
};

export default ForgetPassword;
