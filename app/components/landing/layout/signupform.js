'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BsEye } from 'react-icons/bs';
import { FiEyeOff } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import { useTimer } from 'use-timer';
import { useSite } from '@/app/context/site';
import { postRegister, sendOtp } from '@/app/helpers/backend';
import { Input } from 'antd';
import { useAuthModal } from '@/app/context/authModal';

const SignupForm = ({}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const { showLoginModal, setShowLoginModal,showSignup, setShowSignup } = useAuthModal()
    const { settings } = useSite();
    console.log("🚀 ~ SignupForm ~ settings:", settings)
    const router = useRouter();

    const [otpRequired, setOtpRequired] = useState(false);
    const [otp, setOTP] = useState('');
    const [signupPayload, setSignupPayload] = useState(null);
    const [loading, setLoading] = useState(false);

    const { time, start, pause, reset } = useTimer({
        initialTime: 160,
        timerType: 'DECREMENTAL',
    });

    useEffect(() => {
        if (email && otpRequired) {
            start();
        }
        if (time === 0) {
            pause();
        }
    }, [email, time, start, pause, otpRequired]);

    const validateForm = () => {
        let tempErrors = {};
        if (!firstName) {
            tempErrors.firstName = "First Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(firstName)) {
            tempErrors.firstName = "Enter a valid first name";
        }
        if (!lastName) {
            tempErrors.lastName = "Last Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(lastName)) {
            tempErrors.lastName = "Enter a valid last name";
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
            if (settings?.otp_required === true) {
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
                    reset();
                    start();
                }
            } else {
                // If OTP is not required, directly complete signup
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
            setShowSignup(false);
            setShowLoginModal(true);
            // router.push("/"); // Optionally keep or remove this if you want to redirect
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
            setShowSignup(false);
            setShowLoginModal(true);
        }
        setLoading(false);
    };

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            {!otpRequired ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-2 ">
                        <label className="block text-textMain text-base font-medium mb-[6px]">First Name</label>
                        <input
                            type="text"
                            placeholder="Please enter your first name"
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div className="mb-2 ">
                        <label className="block text-textMain text-base font-medium mb-[6px]">Last Name</label>
                        <input
                            type="text"
                            placeholder="Please enter your last name"
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                    <div className="mb-2 ">
                        <label className="block text-textMain text-base font-medium mb-[6px]">Phone</label>
                        <input
                            type="text"
                            placeholder="Please enter your phone number"
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div className="mb-2 ">
                        <label className="block text-textMain text-base font-medium mb-[6px]">Email</label>
                        <input
                            type="email"
                            placeholder="Please enter your email"
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-3 lg:mb-4">
                        <label className="block text-textMain text-base font-medium mb-[6px]">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Please enter your password"
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10 sm:pr-12"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <FiEyeOff size={18} className="sm:w-5 sm:h-5" />
                                ) : (
                                    <BsEye size={18} className="sm:w-5 sm:h-5" />
                                )}
                            </button>
                            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-pritext-primary text-white py-1  text-sm sm:text-base font-medium hover:bg-orange-600 bg-primary transition-colors mb-2 "
                        disabled={loadingRequest}
                    >
                        {loadingRequest ? "Signing up..." : "Sign up"}
                    </button>
                </form>
            ) : (
                <form className="mt-6 space-y-5" onSubmit={verifyOTP}>
                    <div>
                        <div className='flex justify-center'>
                            <Input.OTP length={5} onChange={(e) => setOTP(e)} />
                        </div>
                    </div>
                    <p className="dark:text-White_Colo capitalize text-center mt-6 mb-2 md:text-sm text-xs font-poppins">
                        {(`Didn't receive the code?`)} {
                            time === 0 ?
                                <span
                                    className="text-primary cursor-pointer"
                                    onClick={async () => {
                                        const { success, message } = await sendOtp({ body: { identifier: email, action: 'signup' } });
                                        if (success === false) return toast.error(message)
                                        toast.success(message)
                                        reset()
                                        start()
                                    }}
                                >
                                    {("Resend")}
                                </span>
                                :
                                <span className="text-primary">
                                    {(`resend in`)} {time} {('s')}
                                </span>
                        }
                    </p>
                    <button
                        type="submit"
                        className={`w-full text-white py-1 text-sm sm:text-base font-medium rounded hover:bg-orange-600 bg-primary transition-colors mb-2  ${loading ? "bg-gray-400 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default SignupForm;
