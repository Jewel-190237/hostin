'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { message as antMessage } from 'antd';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { useUser } from '@/app/context/user';
import {  postResetPassword } from '@/app/helpers/backend';


const Frontend = () => {
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loadingRequest, setLoadingRequest] = useState(false)
    const router = useRouter();
    const { getUser } = useUser()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingRequest(true)
        const { success, message, data } = await postResetPassword({ body: { password: password, confirm_password: password2, token: localStorage.getItem("token") } })
        
        if (!success) {
            toast.error(message);
            setLoadingRequest(false)
        } else {
            setLoadingRequest(false)
            toast.success(message)
            localStorage.removeItem("token")
            getUser()
            router.push("/")
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
                        Change your password
                    </h1>
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    {/* Password Field with Eye Icon */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600">New Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full mt-1 px-4 py-2 text-sm border border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none focus:border-transparent transition pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            className="absolute right-3 top-9 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>
                    {/* Password Field with Eye Icon */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600">Confirm New Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full mt-1 px-4 py-2 text-sm border border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none focus:border-transparent transition pr-10"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        <span
                            className="absolute right-3 top-9 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword2(!showPassword)}
                        >
                            {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={!loadingRequest ? { scale: 1.02 } : {}}
                        whileTap={!loadingRequest ? { scale: 0.98 } : {}}
                        disabled={loadingRequest}
                        className={`w-full text-white py-3 rounded-lg font-bold tracking-wide text-sm shadow-md transition ${loadingRequest ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                            }`}
                    >
                        {loadingRequest ? "Loading..." : "Change Password"}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default Frontend;
