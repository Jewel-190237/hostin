"use client"
import Image from "next/image"
import LoginForm from "./loginform"
import SignupForm from "./signupform"
import { useAuthModal } from "@/app/context/authModal"


const LoginModal = ({}) => {
   const { setShowLoginModal,showLoginModal,showSignup, setShowSignup } = useAuthModal()


  return (
    <div className={` xl:-ml-5 ml-0 ${!showSignup && 'md:mt-36 mt-16'}  flex flex-col lg:flex-row !font-roboto`}>
      <div className="w-full lg:w-[40%] bg-white flex flex-col justify-center py-8 lg:py-16 px-4 sm:px-8 xl:px-16">
        <div className="max-w-md w-full mx-auto lg:mx-0">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <div className="mb-6 sm:w-[153px] w-[100px] h-[100px]  sm:h-[146px]  relative">
              <Image
                src="/footerlogo.png"
                alt="Naariclick Logo"
                width={150}
                height={80}
                className="h-full w-full object-fill"
              />
            </div>
          </div>
          {/* Show LoginForm or SignupForm */}
          {!showSignup ? <LoginForm /> : <SignupForm setShowLoginModal={setShowLoginModal} />}
          {showSignup === true && showLoginModal === true && (
            <>
              <div className="relative mb-4 lg:mb-6 font-roboto">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-3 sm:px-4 bg-white text-gray-500">Or, Log in with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="flex justify-center space-x-3 sm:space-x-4 mb-6 lg:mb-8">
                {/* Google */}
                <button className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>

                {/* Facebook */}
                <button className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>

                {/* Instagram */}
                <button className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z" />
                  </svg>
                </button>

                {/* X (Twitter) */}
                <button className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
              </div>
            </>
           )} 

          {/* Create Account Link */}
          <div className="text-center">
            <span className="text-gray-600 text-xs sm:text-sm">New to Martstick? </span>
            <a
              href="#"
              className="text-primary text-xs sm:text-sm hover:text-orange-600"
              onClick={e => {
                e.preventDefault();
                setShowSignup(true);
              }}
            >
              Create an account
            </a>
          </div>
        </div>
      </div>

      {/* Right side - Background with Model */}
      <div className="w-full lg:w-[60%] relative overflow-hidden ">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image src="/background.png" alt="Orange curved background" width={1000} height={1000}  className="object-fill w-full h-full" priority />
        </div>

        {/* Model image overlay - positioned at bottom */}
        <div className="absolute inset-0 flex items-end justify-center lg:justify-end">
          <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] h-auto">
            <Image
              src="/modelgirl.png"
              alt="Shopping model with bags"
              width={1000}
              height={1000}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
