"use client"

import { useUser } from "@/app/context/user"
import { useState, useEffect, useRef } from "react"
import { BiSave } from "react-icons/bi"
import { FaX } from "react-icons/fa6"
import { FiEdit2 } from "react-icons/fi"
import { updateUser } from "@/app/helpers/backend"
import { useAction } from "@/app/helpers/hooks"
import { uploadSingleFile } from "@/app/helpers/backend"
import Image from "next/image"
import { FaEdit } from "react-icons/fa"
import { message } from "antd"

const Page = () => {
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef(null);

  const { user, getUser ,setUser} = useUser()
  console.log("🚀 ~ Page ~ user:", user)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDay: "",
    gender: "",
    image: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        birthDay: user.birth_date,
        gender: user.gender,
        image: user.image || "",
      })
    }
  }, [user])

  const [editData, setEditData] = useState(formData)

  const handleEdit = (e) => {
    e.preventDefault()
    setIsEditing(true)
    setEditData(formData)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      let imageUrl = editData.image;
      if (editData.image) {
        const { data } = await uploadSingleFile({ image: editData.image });
        if (data?.image) {
          imageUrl = data.image;
        }
      }

      await useAction(updateUser, {
        body: {
          first_name: editData.firstName,
          last_name: editData.lastName,
          email: editData.email,
          phone: editData.phone,
          birth_date: editData.birthDay,
          gender: editData.gender,
          image: imageUrl,
        },
      })
      setFormData({ ...editData, image: imageUrl })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setEditData(formData)
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }))
  }
  const handleEditImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { data } = await uploadSingleFile({ image: file });
      if (data?.image) {
        await updateUser({
          body: {
            ...user,
            image: data.image,
          },
        });
        message.success("Profile picture updated successfully")
        getUser();
      }
    } catch (err) {
      message.error("Image upload failed")
      console.error("Image upload failed", err);
    }
  };

  return (
    <div className="bg-white border border-primary p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl lg:text-2xl font-medium text-textMain">My Profile</h1>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-3 py-1 text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-md transition-colors"
          >
            <FiEdit2 className="w-4 h-4" />
            Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Full Name */}
          <div className={`space-y-1 ${isEditing ? "col-span-2" : ""}`}>
            <label className="text-sm font-medium text-textMain">Full Name</label>
            {isEditing ? (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={editData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={editData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Last Name"
                />
              </div>
            ) : (
              <div className="text-gray-900 font-medium">{`${formData.firstName} ${formData.lastName}`}</div>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-textMain">E-mail Address</label>
            {isEditing ? (
              <input
                type="email"
                value={editData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            ) : (
              <div className="text-gray-900">{formData.email}</div>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-textMain">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            ) : (
              <div className="text-gray-900">{formData.phone}</div>
            )}
          </div>

          {/* Birth Day */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-textMain">Birth Day</label>
            {isEditing ? (
              <input
                type="date"
                value={editData.birthDay}
                onChange={(e) => handleInputChange("birthDay", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            ) : (
              <div className="text-gray-900">{formData.birthDay}</div>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-textMain">Gender</label>
            {isEditing ? (
              <select
                value={editData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <div className="text-gray-900">{formData.gender}</div>
            )}
          </div>

          {/* Profile Picture */}
        {
          !isEditing && (
            <div className="space-y-1">
            <h2 className="text-sm font-medium text-textMain">Profile Picture</h2>
            <div className="relative w-16 h-16 rounded-full  border border-primary ">
              <Image
                width={1000}
                height={1000}
                src={user?.image || "/default.png"}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
              <div>
                <div
                  className="absolute -right-1 -bottom-1 z-50 text-black cursor-pointer"
                  onClick={handleEditImageClick}
                >
                  <FaEdit />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          )
        }
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {isEditing ? (
            <>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <BiSave className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                <FaX className="w-4 h-4" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className="px-6 py-2 bg-textMain text-white rounded-lg hover:bg-slate-800 transition-colors font-medium">
                Edit Profile
              </button>
              <button type="button" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors font-medium">
                Change Password
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default Page;
