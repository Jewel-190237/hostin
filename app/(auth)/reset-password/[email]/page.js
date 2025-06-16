'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { Input } from 'antd';
import { useUser } from '@/app/context/user';
import { postVerifyOtp, sendOtp } from '@/app/helpers/backend';
import { useTimer } from 'use-timer';


const ForgetPassword = () => {
    const [otp, setOTP] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { getUser } = useUser();
    const params = useParams();
    const verifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (params?.email === undefined) {
            return toast.error("Email not found")
        }
        if (otp.length !== 5) {
            return toast.error("Invalid OTP")
        }
        const { success, message, data } = await postVerifyOtp({body: { identifier: decodeURIComponent(params?.email), action: "forget_password", otp: otp }})
        console.log("🚀 ~ verifyOTP ~  data:", data)
        if (!success) {
            toast.error(message);
            setLoading(false)
        } else {
            localStorage.setItem("token", data?.accessToken)
            getUser()
            router.push("/change-password")
        }
    };
    const { time, start, pause, reset, status } = useTimer({
        initialTime: 160,
        timerType: 'DECREMENTAL',
    });

    useEffect(() => {
        if (params?.email) {
            start()
        }
        if (time === 0) pause()
    }, [time, start, pause, params])

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
                        {"Verify OTP"}
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        {`Please enter the verification code sent to ${decodeURIComponent(params?.email)}`}

                    </p>
                </div>
                {
                    <form className="mt-6 space-y-5" onSubmit={verifyOTP}>
                        <div>
                            <div className='flex justify-center'><Input.OTP length={5} onChange={(e) => setOTP(e)} /></div>
                        </div>
                        <p className="dark:text-White_Colo capitalize text-center mt-6 mb-2 md:text-sm text-xs font-poppins">
                            {(`Didn't receive the code?`)} {
                                time === 0 ?
                                    <span
                                        className="text-primary cursor-pointer"
                                        onClick={async () => {
                                            const { success, message } = await sendOtp({ body: { identifier: decodeURIComponent(params?.email), action: 'forget_password' } });
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
                }

            </motion.div>
        </div>
    );
};

export default ForgetPassword;
