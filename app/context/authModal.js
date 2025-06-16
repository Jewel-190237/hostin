import { createContext, useContext } from "react";

const AuthModal = createContext(undefined)
export const useAuthModal = () => useContext(AuthModal)
export default AuthModal