'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { postLogin } from '../../helpers/backend';
import { useRouter } from 'next/navigation';
import { useUser } from '../../context/user';
import { toast, Toaster } from 'react-hot-toast';


const Frontend = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loadingRequest, setLoadingRequest] = useState(false)
    const router = useRouter();
    const { getUser } = useUser()
    const validateForm = () => {
        let tempErrors = {};
        if (!email) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = "Enter a valid email";
        }

        if (!password) {
            tempErrors.password = "Password is required";
        } else if (password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoadingRequest(true);
            const requestBody = {
                body: {
                    identifier: email,
                    password: password,
                },
            };
            const { success, message, data } = await postLogin(requestBody);
            if (!success) {
                toast.error(message);
                setLoadingRequest(false);
            } else {
                const { role } = data.user;
                const { accessToken } = data;

                localStorage.setItem('token', accessToken); 
                if (role === "admin") {
                    router.push("/admin");
                    toast.success(message || "Login Successfully as Admin");
                } else if (role === "user") {
                    router.push("/user");
                    toast.success(message || "Login Successfully as User");
                } else if (role === "vendor") {
                    router.push("/vendor");
                    toast.success(message || "Login Successfully as Vendor");
                } else {
                    toast.error("Invalid role. Please contact support.");
                }
    
                setLoadingRequest(false);
                getUser(); 
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <Toaster position="top-center" reverseOrder={false} />
            <div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        POPULAR <span className="text-orange-500 uppercase">E-commerce</span>
                    </h1>
                    <p className="text-gray-500 text-sm font-medium tracking-wide">Sign in to your account</p>
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full mt-1 px-4 py-2 text-sm border border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:outline-none transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Password Field with Eye Icon */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full mt-1 px-4 py-2 text-sm border border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none focus:border-transparent transition pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span 
                            className="absolute right-3 top-10 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span></span>
                        <Link href="/reset-password" className="text-orange-500 hover:text-orange-600 transition">
                            Forgot Password?
                        </Link>
                    </div>


                    <button 
                        className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold tracking-wide text-sm shadow-md hover:bg-orange-600 transition"
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Frontend;
