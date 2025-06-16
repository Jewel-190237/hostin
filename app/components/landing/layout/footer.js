'use client'

import Image from "next/image"
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import Subscrib from "./subscrib"
import { useSite } from "@/app/context/site"
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa'
import Link from "next/link"

const Footer = () => {
  const {settings} = useSite()
 
  return (
    <footer className="w-full container ">
      <div
        className="bg-primary font-roboto sm:py-8 py-4 h-[318px] px-4 flex flex-col items-center justify-center !w-full md:py-12 bg-no-repeat relative overflow-hidden rounded-[20px]"
        style={{
          backgroundImage: "url('/footerbg.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="container mx-auto ">
          <h2 className="footer_title text-center mb-6">Subscribe to your shopping</h2>
        <Subscrib />
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 xsm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
            {/* Logo and Social Media */}
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-6 sm:w-[150px] w-[100px] h-[100px] lg:w-[228px] sm:h-[150px] lg:h-[218px] relative">
                  <Image
                    src={settings?.site_logo || "/footerlogo.png"}
                  alt="Naariclick Logo"
                  width={150}
                  height={80}
                  className="h-full w-full object-fill"
                />
              </div>
              <div className="flex sm:space-x-4 space-x-1">
                {settings?.social_media_link?.map((social) => (
                  <SocialIcon key={social._id} type={social.name.toLowerCase()} link={social.link} />
                ))}
              </div>
            </div>

            {/* Help & Support Column 1 */}
            <div>
              <h3 className="text-blue-900 font-semibold text-lg mb-4">Help & Support</h3>
              <ul className="space-y-2">
                <FooterLink href="/flash-sale" label="Flash Sell" />
                <FooterLink href="/coupon" label="Coupon" />
                <FooterLink href="/all-brands" label="All Brands" />
                <FooterLink href="/all-seller" label="All Sellers" />
              </ul>
            </div>

            {/* Help & Support Column 2 */}
            <div>
              <h3 className="text-blue-900 font-semibold text-lg mb-4">Help & Support</h3>
              <ul className="space-y-2">
                <FooterLink href="#" label="App Install" />
                <FooterLink href="#" label="Privacy & Policy" />
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-blue-900 font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaPhoneAlt size={20} className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                  <span className="text-gray-700">{settings?.site_phone}</span>
                </li>
                <li className="flex items-start whitespace-normal  flex-wrap">
                  <FaEnvelope size={20} className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                  <span className="text-gray-700">{settings?.site_email}</span>
                </li>
                <li className="flex items-start">
                  <FaMapMarkerAlt size={20} className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-700 lg:w-[170px] w-full">
                    {settings?.site_address}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}

const FooterLink = ({ href, label }) => {
  return (
    <li>
      <Link href={href || "#"} className="text-gray-700 hover:text-primary font-roboto transition-colors">
        {label}
      </Link>
    </li>
  )
}

const SocialIcon = ({ type ,link }) => {
  return (
    <Link
      href={link || "#"}
      target="_blank"
      className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center text-white hover:bg-primary font-roboto transition-colors"
    >
      {type === "facebook" && <FaFacebookF />}
      {type === "instagram" && <FaInstagram />}
      {type === "youtube" && <FaYoutube />}
      {type === "twitter" && <FaTwitter />}
    </Link>
  )
}

export default Footer
