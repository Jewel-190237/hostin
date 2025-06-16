"use client"

import { BiChevronRight, BiHeart, BiUser } from 'react-icons/bi';
import { BsChevronRight } from 'react-icons/bs';
import { FaUser, FaMapMarkerAlt, FaCreditCard, FaWallet } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa6';
import { FcPackage } from 'react-icons/fc';
import { FiChevronRight, FiShoppingCart } from 'react-icons/fi';
import { PiX } from 'react-icons/pi';
import { SiTarom } from 'react-icons/si';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export function Sidebar({ isOpen, onClose }) {
  

  const pathName = usePathname()

  const sidebarItems = [
    {
      title: "Manage My Account",
      items: [
        { name: "Dashboard",  link: "/user" },
        { name: "My Profile",  link: "/user/profile" },
        { name: "Address Book", link: "/user/address-book" },
        { name: "My Payment Option",  link: "/user/payment-options" },
        { name: "Maristock Wallet",  link: "/user/wallet" },
      ],
    },
    {
      title: "My Orders",
      items: [
        { name: "My Returns", link: "/user/returns" },
        { name: "My Cancellation", link: "/user/cancellations" },
      ],
    },
  ]

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <div
      className={`
        fixed lg:static inset-y-0 left-0 z-50 w-[205px] h-fit bg-white border border-primary p-4 transform transition-transform duration-300 !font-roboto ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        lg:block
      `}
    >
      {/* Mobile Close Button */}
      <div className="flex justify-between items-center mb-4 lg:hidden">
        <h2 className="text-lg font-semibold text-textMain">Menu</h2>
        <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
          <PiX className="w-5 h-5" />
        </button>
      </div>

      {/* User Info */}
      <div className="mb-6">
        <div className="text-sm text-textMain mb-1">Hello: 01765601019</div>
        <div className="flex items-center text-sm text-green-600">
          <BiUser className="w-4 h-4 mr-1" />
          Verified Account
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-4">
        {sidebarItems.map((section, index) => (
          <div key={index}>
            <h3 className="font-medium text-textMain mb-2 text-sm lg:text-lg ">{section.title}</h3>
            <ul className="space-y-1 ml-4">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link href={item.link} className={`flex items-center justify-between text-sm font-roboto rounded-md font-normal leading-5 transition-colors ${pathName === item.link ? 'text-primary ' : 'text-tertialText hover:text-primary '}`}
                      onClick={handleLinkClick}>
                    
                      <div className="flex items-center">
                        {item.name}
                      </div>
                      <BiChevronRight className="w-4 h-4 lg:hidden" />
                  
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="">
          <Link href="/reviews" className={`flex items-center justify-between  pt-2 font-medium text-textMain  text-sm lg:text-lg rounded-md transition-colors ${pathName === '/reviews' ? 'text-primary ' : 'text-tertialText hover:text-primary '}`}
              onClick={handleLinkClick}>
            
              <div className="flex items-center">
                {/* <SiTarom className="w-4 h-4 mr-2" /> */}
                My Reviews
              </div>
              <BsChevronRight className="w-4 h-4 lg:hidden" />
            
          </Link>
          <Link href="/wishlist" 
           className={`flex items-center justify-between pt-2 font-medium text-textMain  text-sm lg:text-lg rounded-md transition-colors ${pathName === '/wishlist' ? 'text-primary ' : 'text-tertialText hover:text-primary '}`}
           onClick={handleLinkClick}
          >
            
              <div className="flex items-center">
                
                My Wishlist
              </div>
              <FaChevronRight className="w-4 h-4 lg:hidden" />
          </Link>
          <Link href="/cart"  className={`flex items-center justify-between  pt-2 font-medium text-textMain  text-sm lg:text-lg rounded-md transition-colors ${pathName === '/cart' ? 'text-primary ' : 'text-tertialText hover:text-primary '}`}
           >
          
              <div className="flex items-center">
                {/* <FiShoppingCart className="w-4 h-4 mr-2" /> */}
                My Cart
              </div>
              <FiChevronRight className="w-4 h-4 lg:hidden" />
       
          </Link>
        </div>
      </nav>
    </div>
  )
}
