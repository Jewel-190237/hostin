'use client'
import { postLogin } from '@/app/helpers/backend'
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { BsEye } from "react-icons/bs"
import { FiEyeOff } from "react-icons/fi"
import { toast, Toaster } from 'react-hot-toast';
import { useUser } from '@/app/context/user'
import { useAuthModal } from '@/app/context/authModal'
import ForgotPassword from './forgotpass'
const LoginForm = () => {
     const [showPassword, setShowPassword] = useState(false)
      const [rememberMe, setRememberMe] = useState(true)
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const { setShowLoginModal} = useAuthModal()
        const [errors, setErrors] = useState({});
        const [loadingRequest, setLoadingRequest] = useState(false)
        const router = useRouter();
        const { getUser } = useUser()
        const [showForgotPassword, setShowForgotPassword] = useState(false);

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
                    setShowLoginModal(false);
                    getUser(); 
                }
            }
        };
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

        const handleUserClick = (e) => {
            e.preventDefault();
            setEmail('alen@gmail.com');
            setPassword('123456');
        };

        const handleVendorClick = (e) => {
            e.preventDefault();
            setEmail('vendor@example.com');
            setPassword('123456');
        };

        const handleAdminClick = (e) => {
            e.preventDefault();
            setEmail('admin@example.com');
            setPassword('123456');
        };

          const handleEmployeeClick = (e) => {
            e.preventDefault();
            setEmail('employee@example.com');
            setPassword('123456');
        };

    if (showForgotPassword) {
        return <ForgotPassword onBack={() => setShowForgotPassword(false)} />;
    }

  return (
   <form onSubmit={handleSubmit}>
          {/* Phone or E-mail Input */}
          <div className="flex gap-3">
            <button type='button' onClick={handleUserClick} className='w-full  border border-gray-300 text-white py-2 text-sm sm:text-base font-medium hover:bg-orange-600 bg-primary transition-colors mb-4 lg:mb-6'>User</button>
            <button type='button' onClick={handleVendorClick} className='w-full  border border-gray-300 text-white py-2 text-sm sm:text-base font-medium hover:bg-orange-600 bg-primary transition-colors mb-4 lg:mb-6'>Vendor</button>
            <button type='button' onClick={handleAdminClick} className='w-full  border border-gray-300 text-white py-2 text-sm sm:text-base font-medium hover:bg-orange-600 bg-primary transition-colors mb-4 lg:mb-6'>Admin </button>
            <button type='button' onClick={handleEmployeeClick} className='w-full  border border-gray-300 text-white py-2 text-sm sm:text-base font-medium hover:bg-orange-600 bg-primary transition-colors mb-4 lg:mb-6'>Employee</button>
          </div>
          <div className="mb-4 lg:mb-6">
            <label className="block text-textMain text-base font-medium mb-[6px]">Phone or E-mail</label>
            <input
              type="email"
              placeholder="Please enter your Phone or E-mail"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                 value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
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

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 bg-white border-gray-300 focus:ring-orange-500"
              />
              <span className="ml-2 text-xs sm:text-sm text-gray-600">Remember ?</span>
            </label>
            <a
                    href="#"
                    className="text-xs sm:text-sm text-primary hover:text-orange-600"
                    onClick={e => {
                        e.preventDefault();
                        setShowForgotPassword(true);
                    }}
                >
                  Forgot password ?
                </a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-pritext-primary text-white py-1  text-sm sm:text-base font-medium hover:bg-orange-600 bg-primary transition-colors mb-4 lg:mb-6">
            Log in
          </button>
</form>
  )
}

export default LoginForm