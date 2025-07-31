'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import { PiMapPinAreaBold } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import { BiPhoneCall } from "react-icons/bi";
// import ContacTactModal from "../../utils/contactModal";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentYear(new Date().getFullYear());
    }
  }, []);

  const navLinks1 = [
    { name: "Home", link: "/doctor" },
    { name: "About Us", link: "/diagnostic" },
    { name: "Services", link: "/blood" },
    { name: "Building Design", link: "/dental" },
    { name: "Plans", link: "/ambulance" },
    { name: "Civil Engineering", link: "/pharmacy" },
    { name: "Structural", link: "/pharmacy" },
    { name: "Engineering", link: "/pharmacy" },
    { name: "Survey and Site", link: "/pharmacy" },
    { name: "Analysis", link: "/pharmacy" },
    { name: "Certifications and Approvals", link: "/pharmacy" },
    { name: "Gallery", link: "/pharmacy" },
    { name: "Building Design", link: "/pharmacy" },
    { name: "Engineering", link: "/pharmacy" },
    { name: "Contact Us", link: "/pharmacy" },
  ];

  const navLinks2 = [
    { name: "Monday – Friday: 8:30am – 5:00pm", link: "/blog" },
    { name: "Saturday: By appointment only", link: "/physiotherapy-center" },
    { name: "Sunday: Closed", link: "/nursing-home-care" }
  ];

  const navLinks3 = [
    {
      name: "Dhaka-1209, Bangladesh",
      link: "https://maps.app.goo.gl/k5caWFQUjbj88H5T7",
      icon: <PiMapPinAreaBold />,
    },
    {
      name: "contact@aidfastbd.com",
      link: "mailto:contact@aidfastbd.com",
      icon: <MdOutlineEmail />,
    },
    {
      name: "+8801338988734",
      link: handleOpen,
      icon: <BiPhoneCall />,
    },
  ];

  const navIcons = [
    {
      icon: FaWhatsapp,
      link: handleOpen
    },
    {
      icon: FaFacebookF,
      link: 'https://www.facebook.com/profile.php?id=61552667941624'
    },
  ];

  return (
    <div className="bg-[#EEEEEE] w-full xl:pt-10 lg:pt-9 md:pt-7 pt-5 pb-1 mt-10">

      <div className="aid-container"
      >
        <div className="flex flex-col md:flex-row justify-center gap-3 lg:gap-0">
          <div className="w-full md:w-[30%] lg:w-[35%]">
            <Image src="/logo.png" alt="logo" width={253} height={90} />
            <p className="description1 mt-4 text-black/90 md:max-w-[326px]">
              At Abcon, we provide clients with a complete package of architectural services. We take the project from conception to approval, procuring all the necessary documentation. This streamlines the entire design process
            </p>
          </div>

          <div className="w-full md:w-[70%] lg:w-[65%] mt-5 sm:mt-0">
            <div className="flex flex-col sm:flex-row justify-between">
              {/* Services */}
              <div className="flex flex-col items-center sm:items-start">
                <h3 className="text-3xl font-bold text-black mt-4 sm:mt-0">Sitemap</h3>
                <ul className="mt-5">
                  {navLinks1.map((item, index) => (
                    <li key={index} className="flex flex-col items-center sm:items-start last:mb-6 mt-2 descruiption1 text-black/90 hover:text-black cursor-pointer">
                      <Link target="_blank" className="text-center" href={item.link}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div className="flex flex-col items-center sm:items-start ">
                <h3 className="text-3xl font-bold text-black mt-4 sm:mt-0">Trading Hours</h3>
                <p className="mt-5">
                  Monday – Friday: 8:30am – 5:00pm <br />
                  Saturday: By appointment only <br />
                  Sunday: Closed
                  <p className="my-3 h-[1px] w-full bg-slate-300"></p>
                  <Link href={"/privacy"}>Privacy Policy</Link>
                </p>
              </div>

              {/* Address */}
              <div className="flex flex-col items-center sm:items-start">
                <h3 className="text-3xl font-bold text-black mt-4 sm:mt-0">Contact Us</h3>
                <p className="mt-5">Suite 4, Level 4 402-410 Chapel <br /> Road Bankstown</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
