'use client'
import { Form, Modal } from 'antd'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import FormInput from '../../form/form-input'
import FormCountrySelect from '../../form/country'
import { useUser } from '@/app/context/user'
import SubmitButton from '../../admin/common/submit-button'
import { useAction } from '@/app/helpers/hooks'
import { updateUser, uploadSingleFile } from '@/app/helpers/backend'
import TitleBar from '../../admin/common/title-bar'


const ProfileContent = () => {
  const [form] = Form.useForm();  
  const [showEditSection, setShowEditSection] = useState(false)
   const { user,getUser,setUser} = useUser()
      useEffect(() => {
      if (showEditSection) {
          form.setFieldsValue({
              first_name: user?.first_name || "",
              last_name: user?.last_name || "",
              address: user?.address || "",
              city: user?.city || "",
              country: user?.country || "",
              about: user?.about || "",
              state: user?.state || "",
              zip_code: user?.zip_code || "",
              email: user?.email || "",
              phone: user?.phone || "",
              image: user?.image
                  ? [{
                      uid: '-1',
                      name: 'image.png',
                      status: 'done',
                      url: user?.image
                  }]
                  : [],
          });
      }
  }, [user, form, showEditSection])

  const fileInputRef = useRef(null);

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
        getUser();
      }
    } catch (err) {
      // handle error (optional)
      console.error("Image upload failed", err);
    }
  };

  return (
    <>
        <TitleBar title="profile" />
       <div className="w-full bg-white rounded-lg shadow border">
      <div className="bg-gray-100 h-72 rounded-t-lg relative">
        <Image
          src={user?.shop_banner || "/default.png"}
          alt="Profile"
          loading='lazy'
          width={1000}
          height={1000}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute left-6 -bottom-20 w-40 h-40 rounded-full border-4 border-pink-600 bg-gray-200 ">
          <Image
            width={1000}
            height={1000}
            src={user?.image || "/default.png"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          <div>
            <div
              className="absolute right-4 bottom-2 z-50 text-black cursor-pointer"
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

      {/* Profile Info */}
      <div className="pt-24 px-6 pb-6">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{user?.first_name || "John"} {user?.last_name || "Doe"}</h2>
            <p className="text-sm text-gray-500">{user?.about}</p>
          </div>
          <button  onClick={() => setShowEditSection(!showEditSection)} className="flex items-center px-3 py-1 text-sm text-white bg-gray-600 hover:bg-gray-700 rounded">
            ✏️ Edit
          </button>
        </div>

      </div>

    </div>
     <Modal
        title="Edit Profile"
        open={showEditSection}
        width={700}
        onCancel={() => setShowEditSection(false)}
        footer={null}
        destroyOnClose
      >
        <Form 
          onFinish={async (values) => {
            const payload = {
              body: {
                ...values,
                first: values.first_name,
                last_name: values.last_name,
                email: values.email,
                phone: values.phone,
                shop_address: values.shop_address,
                city: values.city,
                about: values.about,
                country: values.country,
                state: values.state,
                zip_code: values.zip_code,
              },
            };
            const data = await useAction(updateUser, payload);
            getUser();
            setUser(data);
            setShowEditSection(false);
          }}
          form={form}
          layout="vertical"
          className='w-full grid gap-4 grid-cols-2 lable-padding'
        >
          <FormInput label="First Name" name="first_name" placeholder="First Name" />
          <FormInput label="Last Name" name="last_name" placeholder="Last Name" />
          <FormInput label="about" name="about" placeholder="About" />
          <FormInput label="Email" name="email" placeholder="Email" />
          <FormInput label="Phone" name="phone" placeholder="Phone" />
          <FormInput label="City" name="city" placeholder="City" />
          <FormCountrySelect label="country" name="country" placeholder="Country" />  
          <FormInput label="State" name="state" placeholder="State" />
          <FormInput label="Zip Code" name="zip_code" placeholder="Zip Code" />
          <div className="flex items-center justify-start mt-3">
            <SubmitButton>Save</SubmitButton>
          </div>
        </Form>
      </Modal>
       </>
  )
}

export default ProfileContent
