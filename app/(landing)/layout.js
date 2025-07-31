import React from "react"
import { Inter } from "next/font/google"
import "../../styles/globals.css"
import TopBar from "../components/landing/layout/topbar"
import Navbar from "../components/landing/layout/navber"
import Footer from "../components/landing/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "abcon",
  description: "",
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className='font-roboto '
        suppressHydrationWarning
      >
        {/* <TopBar />
        <Navbar /> */}
        {children}
        <Footer />
      </body>
    </html>
  )
}
