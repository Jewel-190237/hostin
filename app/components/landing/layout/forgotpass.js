import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast, Toaster } from 'react-hot-toast'
import { Input } from 'antd'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { sendOtp, postVerifyOtp, postResetPassword } from '@/app/helpers/backend'
import { useTimer } from 'use-timer'
import { useUser } from '@/app/context/user'

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOTP] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [loadingRequest, setLoadingRequest] = useState(false)
  const router = useRouter()
  const { getUser } = useUser()

  const { time, start, pause, reset } = useTimer({
    initialTime: 160,
    timerType: 'DECREMENTAL',
  })

  useEffect(() => {
    if (otpSent) start()
    if (time === 0) pause()
  }, [otpSent, time, start, pause])

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    const requestBody = {
      body: {
        identifier: email,
        action: "forget_password",
      },
    }
    const { success, message } = await sendOtp(requestBody)
    if (!success) {
      toast.error(message)
      setLoading(false)
    } else {
      toast.success("OTP sent to your email")
      setOtpSent(true)
      reset()
      start()
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (otp.length !== 5) {
      toast.error("Invalid OTP")
      setLoading(false)
      return
    }
    const { success, message, data } = await postVerifyOtp({
      body: { identifier: email, action: "forget_password", otp }
    })
    if (!success) {
      toast.error(message)
      setLoading(false)
    } else {
      localStorage.setItem("token", data?.accessToken)
      toast.success("OTP verified")
      setShowChangePassword(true)
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setLoadingRequest(true)
    const { success, message } = await postResetPassword({
      body: {
        password: password,
        confirm_password: password2,
        token: localStorage.getItem("token")
      }
    })
    if (!success) {
      toast.error(message)
      setLoadingRequest(false)
    } else {
      setLoadingRequest(false)
      toast.success(message)
      localStorage.removeItem("token")
      getUser && getUser()
      // Optionally, you can close modal or go back to login
      if (onBack) onBack()
    }
  }

  if (showChangePassword) {
    return (
      <div className="flex items-center justify-center px-4">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="bg-white xl:px-8 px-0 pb-8 pt-4 w-full">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold font-roboto text-textMain">
              Change your password
            </h1>
          </div>
          <form className="mt-6 space-y-5" onSubmit={handleChangePassword}>
            <div>
              <label className="block text-textMain text-base font-medium mb-[6px]">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Please enter your new password"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Optionally add an eye icon here if you want */}
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-textMain text-base font-medium mb-[6px]">Confirm New Password</label>
              <input
                type={showPassword2 ? "text" : "password"}
                placeholder="Please confirm your new password"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              {/* Optionally add an eye icon here if you want */}
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <button
              type="submit"
              disabled={loadingRequest}
              className={`w-full text-white py-3 rounded-lg font-bold tracking-wide text-sm shadow-md transition ${loadingRequest ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                }`}
            >
              {loadingRequest ? "Loading..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center !font-roboto px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="bg-white  xl:px-8 px-0 pb-8 pt-4 w-full "
      >
        <div className="text-center">
          <h1 className="text-3xl font-extrabold font-roboto md:whitespace-pre whitespace-normal text-textMain">
            {otpSent ? "Verify OTP" : "Forgot Your Password?"}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {otpSent
              ? `Please enter the verification code sent to ${email}`
              : "Enter your registered email to receive a password reset OTP."}
          </p>
        </div>
        {!otpSent ? (
          <form className="mt-6 space-y-5" onSubmit={handleSendOtp}>
            <div className="mb-4 lg:mb-6">
              <label className="block text-textMain text-base font-medium mb-[6px]">Phone or E-mail</label>
              <input
                type="email"
                placeholder="Please enter your Phone or E-mail"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-3 rounded-lg font-bold tracking-wide text-sm shadow-md transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            {onBack && (
              <button type="button" className="w-full mt-2 text-gray-500 underline" onClick={onBack}>
                Back to Login
              </button>
            )}
          </form>
        ) : (
          <form className="mt-6 space-y-5" onSubmit={handleVerifyOtp}>
            <div>
              <div className='flex justify-center'><Input.OTP length={5} onChange={setOTP} /></div>
            </div>
            <p className="dark:text-White_Colo capitalize text-center mt-6 mb-2 md:text-sm text-xs font-poppins">
              {`Didn't receive the code?`} {
                time === 0 ?
                  <span
                    className="text-primary cursor-pointer"
                    onClick={async () => {
                      const { success, message } = await sendOtp({ body: { identifier: email, action: 'forget_password' } })
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
              disabled={loading}
              className={`w-full text-white py-3 rounded-lg font-bold tracking-wide text-sm shadow-md transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            {onBack && (
              <button type="button" className="w-full mt-2 text-gray-500 underline" onClick={onBack}>
                Back to Login
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword