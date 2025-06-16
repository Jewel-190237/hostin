"use client"
import { useRef, useState } from "react"
import React from "react"
import { contactus } from "@/app/helpers/backend"
import { useAction } from "@/app/helpers/hooks"
import ReCAPTCHA from "react-google-recaptcha"
import { message } from "antd"
import { useSite } from "@/app/context/site"

const ContactPage = () => {
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const { settings } = useSite();
  const recaptchaRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      message.error("Please verify that you are not a robot.");
      return;
    }
    const payload = { body: { ...formData }, recaptchaToken };
    useAction(
      contactus,
      payload,
      () => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setRecaptchaToken("");
        recaptchaRef.current.reset();
      }
    );
  };

  return (
    <div className="container font-roboto sm:p-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">

          <div className="mb-8 border py-5 px-4 border-gray-300">
            <h2 className="text-base font-medium border-b border-primary mb-4">Working Days</h2>
            <p className="text-textMain font-medium text-lg">
              Our services operate 24/7, providing uninterrupted support every day of the week.
            </p>
          </div>

          <div className="border py-5 px-4 border-gray-300">
            <h2 className="text-base font-medium border-b border-primary mb-4">Office Address</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium text-sm leading-5 text-textBody">Mob: </span>
                <a href={`tel:${settings?.site_phone}`} className="text-primary">
                  {settings?.site_phone}
                </a>
              </p>
              <p>
                <span className="font-medium text-sm leading-5 text-textBody">Web: </span>
                <a href={`mailto:${settings?.site_email}`} className="text-textBody">
                  {settings?.site_email}
                </a>
              </p>
              <div className="flex items-start mt-2">
                <div className="mt-1 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40" fill="none">
                    <path d="M15 32.9931L7.5 21.7431C6.5625 20 5 17.5194 5 15C5 9.4775 9.4775 5 15 5C20.5225 5 25 9.4775 25 15C25 17.5194 23.7156 20 22.5 21.7431L15 32.9931Z" fill="#EC4534" />
                    <path d="M15 0C6.71625 0 0 6.71625 0 15C0 18.2619 1.06938 21.255 2.84688 23.7062C2.87875 23.765 2.88375 23.8306 2.92 23.8869L12.92 38.8869C13.3838 39.5825 14.165 40 15 40C15.835 40 16.6162 39.5825 17.08 38.8869L27.08 23.8869C27.1169 23.8306 27.1213 23.765 27.1531 23.7062C28.9306 21.255 30 18.2619 30 15C30 6.71625 23.2838 0 15 0ZM22.5 21.7431L15 32.9931L7.5 21.7431C6.5625 20 5 17.5194 5 15C5 9.4775 9.4775 5 15 5C20.5225 5 25 9.4775 25 15C25 17.5194 23.7156 20 22.5 21.7431Z" fill="#090026" />
                    <path d="M15 20C17.7614 20 20 17.7614 20 15C20 12.2386 17.7614 10 15 10C12.2386 10 10 12.2386 10 15C10 17.7614 12.2386 20 15 20Z" fill="#271654" />
                  </svg>
                </div>
                <p className="text-textBody">
                  {settings?.site_address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="md:col-span-2 border sm:p-6 p-3">
          <h2 className="text-xl font-medium text-textMain mb-6">Tell Us Your message:</h2>

          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">
                First Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full border border-gray-300  px-2 py-1"
                required
              />
            </div>

            {/* Email and subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  className="w-full border border-gray-300 px-2 py-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">
                  subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="subject"
                  className="w-full border border-gray-300 px-2 py-1"
                />
              </div>
            </div>

            {/* message */}
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 font-medium">
                message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full border border-gray-300 px-2 py-1 h-32"
                required
              />
            </div>

            {/* reCAPTCHA */}
            <div className="mb-6">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={setRecaptchaToken}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-primary text-white px-6 py-2  rounded flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-3" width="29" height="19" viewBox="0 0 29 19" fill="none">
                <path d="M4.3765 16.073C4.30985 16.073 4.24299 16.0576 4.18172 16.0265C4.04221 15.9558 3.95468 15.8153 3.95468 15.6621V13.1973H1.42377C1.19082 13.1973 1.00195 13.0133 1.00195 12.7865V0.462141C1.00195 0.235271 1.19082 0.0513306 1.42377 0.0513306H19.9838C20.2167 0.0513306 20.4056 0.235271 20.4056 0.462141V12.7865C20.4056 13.0133 20.2167 13.1973 19.9838 13.1973H8.72766L4.61841 15.9987C4.54618 16.0479 4.4615 16.073 4.3765 16.073ZM1.84559 12.3757H4.3765C4.60945 12.3757 4.79832 12.5596 4.79832 12.7865V14.8731L8.35277 12.45C8.42369 12.4016 8.5081 12.3757 8.59468 12.3757H19.562V0.872952H1.84559V12.3757Z" fill="white" />
                <path d="M24.6229 18.9486C24.5378 18.9486 24.4532 18.9236 24.3809 18.8744L20.2717 16.0729H9.01557C8.78262 16.0729 8.59375 15.889 8.59375 15.6621V12.7865C8.59375 12.5596 8.78262 12.3757 9.01557 12.3757C9.24852 12.3757 9.43739 12.5596 9.43739 12.7865V15.2513H20.4047C20.4912 15.2513 20.5757 15.2773 20.6466 15.3256L24.201 17.7488V15.6621C24.201 15.4353 24.3899 15.2513 24.6228 15.2513H27.1538V3.74862H19.9828C19.7499 3.74862 19.561 3.56468 19.561 3.33781C19.561 3.11094 19.7499 2.927 19.9828 2.927H27.5756C27.8085 2.927 27.9974 3.11094 27.9974 3.33781V15.6621C27.9974 15.889 27.8085 16.0729 27.5756 16.0729H25.0447V18.5378C25.0447 18.691 24.9572 18.8314 24.8176 18.9022C24.7563 18.9333 24.6895 18.9486 24.6229 18.9486Z" fill="white" />
                <path d="M7.32795 7.85671C6.63016 7.85671 6.0625 7.30386 6.0625 6.62428C6.0625 5.94469 6.63016 5.39185 7.32795 5.39185C8.02575 5.39185 8.59341 5.94469 8.59341 6.62428C8.59341 7.30386 8.02575 7.85671 7.32795 7.85671ZM7.32795 6.21347C7.09537 6.21347 6.90614 6.39777 6.90614 6.62428C6.90614 6.85079 7.09537 7.03509 7.32795 7.03509C7.56053 7.03509 7.74977 6.85079 7.74977 6.62428C7.74977 6.39777 7.56053 6.21347 7.32795 6.21347Z" fill="white" />
                <path d="M10.703 7.85671C10.0052 7.85671 9.4375 7.30386 9.4375 6.62428C9.4375 5.94469 10.0052 5.39185 10.703 5.39185C11.4007 5.39185 11.9684 5.94469 11.9684 6.62428C11.9684 7.30386 11.4007 7.85671 10.703 7.85671ZM10.703 6.21347C10.4704 6.21347 10.2811 6.39777 10.2811 6.62428C10.2811 6.85079 10.4704 7.03509 10.703 7.03509C10.9355 7.03509 11.1248 6.85079 11.1248 6.62428C11.1248 6.39777 10.9355 6.21347 10.703 6.21347Z" fill="white" />
                <path d="M14.078 7.85671C13.3802 7.85671 12.8125 7.30386 12.8125 6.62428C12.8125 5.94469 13.3802 5.39185 14.078 5.39185C14.7757 5.39185 15.3434 5.94469 15.3434 6.62428C15.3434 7.30386 14.7757 7.85671 14.078 7.85671ZM14.078 6.21347C13.8454 6.21347 13.6561 6.39777 13.6561 6.62428C13.6561 6.85079 13.8454 7.03509 14.078 7.03509C14.3105 7.03509 14.4998 6.85079 14.4998 6.62428C14.4998 6.39777 14.3105 6.21347 14.078 6.21347Z" fill="white" />
              </svg>
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default ContactPage