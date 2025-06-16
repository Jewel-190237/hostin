"use client"

import {  useState } from "react"
import {  FaBars, FaBookReader, FaChevronDown, FaTimes } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"
import { CiUser } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { usePathname, useRouter } from "next/navigation"
import { RxHamburgerMenu } from "react-icons/rx";
import { Modal, Drawer } from "antd"
import { useUser } from "@/app/context/user"
import { Dropdown, message } from "antd"
import SearchBer from "./searchber"
import LoginModal from "./loginModal"
import { useAuthModal } from "@/app/context/authModal"
import CartDrawer from "./cartDrawer"
import { useSite } from "@/app/context/site"

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { showLoginModal, setShowLoginModal,setShowSignup } = useAuthModal()
  const {user ,getUser,setUser}= useUser()
  const {settings} = useSite()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories)
  }
  const pathName = usePathname()
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
    if (!showMobileMenu) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }
  


  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/flash-sale", label: "Flash Sale" },
    { href: "/shop", label: "Shop" },
    { href: "/coupon", label: "Coupon" },
    { href: "/all-brand", label: "All Brands" },
    { href: "/all-seller", label: "All Sellers" },
    { href: "#", label: "Pages" },
    { href: "/contact", label: "Contact" },
  ]

   const userItem = [
    {
      key: '1',
      label: (
        <Link
          href={
            user?.role === 'admin' || user?.role === 'employee'
              ? '/admin'
                : user?.role === 'user'
                  ? '/user'
                  : user?.role === 'vendor'
                    ? '/vendor'
                    : '/signin'
          }
        >
          {("Dashboard")}
        </Link>
      ),
    },
    {
      key: '2',
      label: (
       <div
          onClick={() => {
            localStorage.removeItem('token');
            message.success(('Sign out successfully'));
            router.push('/');
            getUser();
            setUser()
          }}
        >
          <p>{('Sign Out')}</p>
        </div>
      ),
    },
  ]
  const userMenu = {
    items: userItem
  };

  const pages = [
    { href: "/about", label: "About Us", icon: <FaBookReader className="text-primary" /> },
    { href: "/blogs", label: "Blogs", icon: <FaBookReader className="text-primary" /> },
    // Add more pages here as needed with their respective icons
  ];

  return (
    <div className="w-full bg-white !font-roboto ">

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:hidden ${showMobileMenu ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleMobileMenu}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[80%] max-w-[300px] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${showMobileMenu ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto`}
      >
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-white to-orange-500">
          <Link href="/" className="h-[40px] w-[40px]">
            <Image
              src={settings?.site_logo || "/footerlogo.png"}
              alt="Naariclick Logo"
              width={120}
              height={40}
              className="h-full w-full object-contain"
            />
          </Link>
          <button onClick={toggleMobileMenu} className="text-gray-800">
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link?.href}
                className={`py-2 border-b border-gray-100 transition-all duration-300 ease-in-out  ${pathName === link.href
                  ? "text-primary font-normal"
                  : "hover:text-primary font-medium"
                  }`}
                style={{
                  transition: "all 0.3s ease",
                }}
                onClick={() => {
                  setShowMobileMenu(false)
                }}
              >
                {link.label}
              </Link>
            ))}


            <div className="py-2  border-gray-100">
              <button
                className="flex items-center justify-between w-full hover:text-yellow-600 font-medium"
                onClick={toggleCategories}
              >
                <span className="flex items-center">
                  Categories
                </span>
                <FaChevronDown className={`h-4 w-4 transition-transform ${showCategories ? "rotate-180" : ""}`} />
              </button>

              {showCategories && (
                <div className="mt-2 pl-4 space-y-2">
                  <CategoryItem icon="🖥️" label="Electronic Device" />
                  <CategoryItem icon="🎧" label="Electronic Accessories" />
                  <CategoryItem icon="💄" label="Health & Beauty" />
                  <CategoryItem icon="🧸" label="Babies & Toys" />
                  <CategoryItem icon="👚" label="Fashion" />
                  <CategoryItem icon="⌚" label="Watches & Accessories" />
                  <CategoryItem icon="🏀" label="Sports & Outdoor" />
                  <div className="py-2 text-sm text-yellow-600 hover:underline cursor-pointer">See All Categories</div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      <div className="custom-modal">
        {/* Logo and Search - Keeping original design */}
        <div className="flex items-center justify-between container mx-auto border-gray-200 px-2 md:px-0">
          <div className="flex items-center sm:ml-6 ml-0">
            <Link href="/" className=" sm:h-[87px] h-14 w-14 sm:w-[91px] cursor-pointer">
              <Image
                src={settings?.site_logo || "/footerlogo.png"}
                alt="Naariclick Logo"
                width={1000}
                height={1000}
                className="h-full w-full object-fill"
              />
            </Link>
          </div>
          <div className="hidden md:flex ">
      <SearchBer />
          </div>
          <div className="flex items-center sm:space-x-6 space-x-2">
            {
              user ? (
                <Dropdown
                  menu={userMenu}
                  placement="bottomRight"
                  trigger={['click' , 'hover'] }
                >
                  <div className="flex flex-col items-center cursor-pointer">
                    <Image
                      src={user?.image || "/default.png"}
                      alt="User Profile"
                      width={1000}
                      height={1000}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <span className="text-xs mt-[2px] sm:flex justify-center  hidden">{user?.first_name}</span>
                  </div>
                </Dropdown>
              ) : (
                <div
                  onClick={() => setShowLoginModal(true)}
                  className="flex flex-col items-center cursor-pointer "
                >
                  <CiUser className="h-8 w-8  text-[#2C2C2C] border-[#2C2C2C] border rounded p-1" />
                  <span className="text-xs mt-1 sm:flex hidden">Login</span>
                </div>
              )
            }
            <div onClick={() => router.push('/wishlist')} className="flex flex-col cursor-pointer items-center ">
              <GoHeart className={`h-8 w-8  text-[#2C2C2C] border-[#2C2C2C] border rounded p-1 ${pathName === "/wishlist" ? "bg-primary text-white" : ""}`} />
              <span className="text-xs mt-1 sm:flex hidden">Wishlist</span>
            </div>
            <div onClick={() => setIsOpen(true)} className="flex flex-col items-center cursor-pointer relative">
              <TfiShoppingCartFull className={`h-8 w-8  text-[#2C2C2C] border-[#2C2C2C] border rounded p-1 ${pathName === "/cart" ? "bg-primary text-white" : ""}`} />
              <span className="text-xs mt-1 sm:flex hidden">Your Cart</span>
              {
                user?.cart?.length > 0 && (
                  <span className="absolute -top-2 -right-1 bg-primary text-white text-xs font-semibold rounded-full w-6 border border-textBody h-6 flex items-center justify-center">
                {user?.cart?.length || 0}
              </span>
                )
              }
            </div>
          </div>
          <button className="md:hidden" onClick={toggleMobileMenu}>
            <FaBars className="h-6 w-6  text-[#2C2C2C] border-[#2C2C2C]" />
          </button>
        </div>
        <hr />
         <div className="md:hidden block w-full  my-5 md:my-0 px-4 md:px-0">
      <SearchBer />
          </div>
        <div
          className={`flex flex-col md:flex-row md:items-center container mx-auto border-gray-200  ${showMobileMenu ? "block" : "hidden md:flex"
            }`}
        >
          <nav className="flex flex-col md:flex-row md:space-x-1 lg:text-base text-sm lg:py-5 py-0">
            {navLinks.map((link, index) => (
              <div key={index} className={`relative group py-2 px-2 md:py-0 border-r last:border-r-0 border-[#2C2C2C] ${pathName === link.href ? 'text-[#2C2C2C] !font-semibold' : 'hover:text-[#2C2C2C] font-normal'} transition-all duration-300 ease-in-out`}>
                <Link
                  href={link.href}
                  className={`relative flex items-center text-center
                    ${pathName === link.href ? 'after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-orange-500' : 'hover:after:absolute hover:after:-bottom-2 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-orange-500'}
                  `}
                >
                  {link.label}
                </Link>

                {link.label === "Pages" && (
                  <div className="absolute left-0 mt-2 w-[30vw] bg-white shadow-xl rounded-lg p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="grid grid-cols-2 gap-4">
                      {pages.map((page, index) => (
                        <div key={index} className="flex gap-2 cursor-pointer items-center rounded-lg border">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                            {page.icon}
                          </div>
                          <Link href={page.href || "#"}>{page.label}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="relative ml-auto hidden md:block">
            <div className="flex items-center space-x-[10px] bg-[#E0E0E0] px-4 py-2 cursor-pointer h-16" onClick={toggleCategories}>
              <RxHamburgerMenu />
              <span className="flex items-center ">
                Categories
              </span>
              <FaChevronDown className="h-4 w-4" />
            </div>

            {showCategories && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg z-50 rounded-md overflow-hidden">
                <div className="py-2 ">
                  <CategoryItem icon="🖥️" label="Electronic Device" />
                  <CategoryItem icon="🎧" label="Electronic Accessories" />
                  <CategoryItem icon="💄" label="Health & Beauty" />
                  <CategoryItem icon="🧸" label="Babies & Toys" />
                  <CategoryItem icon="👚" label="Fashion" />
                  <CategoryItem icon="⌚" label="Watches & Accessories" />
                  <CategoryItem icon="🏀" label="Sports & Outdoor" />
                  <div className="px-4 py-2 text-sm text-center text-blue-600 hover:underline cursor-pointer">
                    See All Categories
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <hr />
      </div>
      <Drawer
        title={null}
        closable={false}
        width={414}
        className="custom-drawer"
        placement="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
      >
       <CartDrawer setIsOpen={setIsOpen} isOpen={isOpen} />
      </Drawer>
      <Modal
      width={1320}
      className="custom-modal"
        open={showLoginModal}
        onCancel={() => {
          setShowLoginModal(false) 
          setShowSignup(false)}}
        footer={null}
        destroyOnClose
      >
        <LoginModal />
      </Modal>
      
    </div>
  )
}

const CategoryItem = ({ icon, label, isActive = false }) => {
  return (
    <div className={`px-4 py-3 flex items-center hover:bg-orange-50 border-b cursor-pointer ${isActive ? "bg-orange-50" : ""}`}>
      <span className="mr-2">{icon}</span>
      <span className={`text-base whitespace-pre ${isActive ? "text-orange-500 font-medium" : "text-gray-700"}`}>{label}</span>
    </div>
  )
}

export default Navbar
