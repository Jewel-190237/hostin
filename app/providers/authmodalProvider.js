"use client"

import { useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import AuthModal from "../context/authModal";

const AuthModalProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

    return (
        <AuthModal.Provider value={{ showLoginModal, setShowLoginModal, showSignup, setShowSignup }}>
            <SkeletonTheme color="#0F172A" highlightColor="#444">
                {children}
            </SkeletonTheme>
        </AuthModal.Provider>
    );
};

export default AuthModalProvider;
