'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { postRegister, sendOtp } from '../../helpers/backend';
// import { useUser } from '@/app/context/user';
import { Input } from 'antd';
import { useTimer } from 'use-timer';
import { useSite } from '@/app/context/site';
// import Input from '@/components/Input'; // Assuming Input.OTP is imported from here

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loadingRequest, setLoadingRequest] = useState(false);

    const { settings } = useSite();
    console.log("🚀 ~ Signup ~ settings:", settings);
    const router = useRouter();

    const [otpRequired, setOtpRequired] = useState(false);
    const [otp, setOTP] = useState('');
    const [signupPayload, setSignupPayload] = useState(null);
    // const [time, setTime] = useState(0); // For resend timer
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let tempErrors = {};
        if (!firstName) {
            tempErrors.firstName = "First Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(firstName)) {
            tempErrors.firstName = "Enter a valid first name";
        }

        if (!phone) {
            tempErrors.phone = "Phone number is required";
        }
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
            if (settings?.otp_required) {
                const payload = {
                    body: {
                        identifier: email,
                        action: "signup",
                    },
                };
                const { success, message } = await sendOtp(payload);
                if (!success) {
                    toast.error(message);
                } else {
                    toast.success("OTP sent successfully!");
                    setSignupPayload({
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        phone: phone,
                        password: password,
                    });
                    setOtpRequired(true);
                }
            } else {
                completeSignup();
            }
        }
    };

    const completeSignup = async () => {
        setLoadingRequest(true);
        const requestBody = {
            body: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                password: password,
            },
        };
        const { success, message } = await postRegister(requestBody);
        if (!success) {
            toast.error(message);
            setLoadingRequest(false);
        } else {
            toast.success(message || "Signup Successful!");
            router.push("/");
        }
    };

    const verifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        const requestBody = {
            body: {
                ...signupPayload,
                otp: otp,
            },
        };
        const { success, message } = await postRegister(requestBody);
        if (!success) {
            toast.error(message);
        } else {
            toast.success(message || "Signup Successful!");
            router.push("/");
        }
        setLoading(false);
    };

     const { time, start, pause, reset, status } = useTimer({
            initialTime: 160,
            timerType: 'DECREMENTAL',
        });
    
        useEffect(() => {
            if (email) {
                start();
            }
            if (time === 0) {
                pause(); 
            }
        }, [email, time, start, pause]);
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
                        POPULAR <span className="text-orange-500 uppercase">E-commerce</span>
                    </h1>
                    <p className="text-gray-500 text-sm font-medium tracking-wide">Sign up for a new account</p>
                </div>

                {!otpRequired ? (
                    <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600">First Name</label>
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                className="w-full mt-1 px-4 py-2 text-sm border border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:outline-none transition"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600">Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter your last name"
                                className="w-full mt-1 px-4 py-2 text-sm border border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:outline-none transition"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {/* {errors. && <p className="text-red-500 text-xs mt-1">{errors.email}</p>} */}
                        </div>
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
                        <div>
                            <label className="block text-sm font-semibold text-gray-600">Phone</label>
                            <input
                                type="number"
                                placeholder="Enter your phone number"
                                className="w-full mt-1 px-4 py-2 text-sm border border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:outline-none transition"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold tracking-wide text-sm shadow-md hover:bg-orange-600 transition"
                        >
                            Sign Up
                        </motion.button>
                    </form>
                ) : (
                    <form className="mt-6 space-y-5" onSubmit={verifyOTP}>
                        <div>
                            <p className="text-center text-sm text-gray-600">
                                {`A verification code has been sent to `}
                                <span className="font-bold text-gray-800">{email}</span>
                            </p>
                            <div className='flex justify-center mt-4'>
                                <Input.OTP length={5} onChange={(e) => setOTP(e)} />
                            </div>
                        </div>
                        <p className="dark:text-White_Colo capitalize text-center mt-6 mb-2 md:text-sm text-xs font-poppins">
                            {`Didn't receive the code?`} {
                                time === 0 ?
                                    <span
                                        className="text-primary cursor-pointer"
                                        onClick={async () => {
                                            const { success, message } = await sendOtp({ body: { identifier: email, action: 'signup' } });
                                            if (success === false) return toast.error(message);
                                            toast.success(message);
                                            reset();
                                            start();
                                        }}
                                    >
                                        Resend
                                    </span>
                                    :
                                    <span className="text-primary">
                                        {`Resend in ${time}s`}
                                    </span>
                            }
                        </p>
                        <motion.button
                            whileHover={!loading ? { scale: 1.02 } : {}}
                            whileTap={!loading ? { scale: 0.98 } : {}}
                            disabled={loading}
                            className={`w-full text-white py-3 rounded-lg font-bold tracking-wide text-sm shadow-md transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                                }`}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </motion.button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Signup;
