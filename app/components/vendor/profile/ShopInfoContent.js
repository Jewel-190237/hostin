'use client'
import React, { useEffect, useState } from 'react'
import TitleBar from '../../admin/common/title-bar'
import Image from 'next/image'
import { BiSolidEdit } from 'react-icons/bi'
import { Form, Modal } from 'antd'
import FormInput from '../../form/form-input'
import MultipleImageInput from '../../form/multiImage'
import { useUser } from '@/app/context/user'
import { useAction } from '@/app/helpers/hooks'
import { updateUser, uploadSingleFile } from '@/app/helpers/backend'
import SubmitButton from '../../admin/common/submit-button'

const ShopInfoContent = () => {
    const [open, setOpen] = useState(false);
    const { user, getUser, setUser } = useUser();
    const [form] = Form.useForm();
    useEffect(() => {
        if (open) {
            form.setFieldsValue({
                shop_name: user?.shop_name || "",
                shop_address: user?.shop_address || "",
                shop_image: user?.shop_image ? [{
                    uid: '-1',
                    name: 'shop_image.png',
                    status: 'done',
                    url: user?.shop_image
                }] : [],
                shop_banner: user?.shop_banner ? [{
                    uid: '-1',
                    name: 'shop_banner.png',
                    status: 'done',
                    url: user?.shop_banner
                }] : [],
            });
        }
    } , [user, form, open]);
    return (
    <>
     <TitleBar title="Shop Info" />

      <div className="w-full  p-2 sm:p-0 bg-gray-50">
      <div
        className="relative  bg-white p-3 sm:p-4 md:p-6 min-h-64 sm:min-h-80 md:min-h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${user?.shop_banner || "/coupon.png"})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="  h-8 sm:h-10 md:h-12 mb-3 sm:mb-4 md:mb-6 ">
            <span className="text-white text-xs sm:text-2xl font-medium font-roboto">{user?.shop_name}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 ">
            <div className=" w-full sm:w-32 md:w-56 h-32 sm:h-32 md:h-72 flex items-center justify-center flex-shrink-0">
                <Image src={user?.shop_image || "/default.png"} alt="Image" width={1000} height={1000} loading='lazy' className="object-fill h-full w-full" />
            </div>
          </div>
            <div className="flex flex-col justify-end items-end pt-4">
              <span className='text-white text-2xl font-roboto font-normal'>{user?.shop_address}</span>
            </div>

          <div className="absolute top-1 right-1 sm:-top-8 sm:-right-5  w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center">
            <BiSolidEdit className="text-white text-2xl sm:text-2xl cursor-pointer" onClick={() => setOpen(true)} />
          </div>
        </div>
      </div>
    </div>

     <Modal title="Edit Shop" width={800} open={open} onCancel={() => setOpen(false)} footer={null}>
        <Form form={form} layout="vertical" className='grid sm:grid-cols-2 grid-cols-1 gap-4'
        onFinish={async (values) => {
          // Upload shop_image if changed
          let shop_image = values.shop_image?.[0]?.originFileObj
            ? null
            : values.shop_image?.[0]?.url || "";
          let shop_banner = values.shop_banner?.[0]?.originFileObj
            ? null
            : values.shop_banner?.[0]?.url || "";

          try {
            if (values.shop_image?.[0]?.originFileObj) {
              const { data } = await uploadSingleFile({ image: values.shop_image[0].originFileObj });
              shop_image = data?.image || "";
            }
            if (values.shop_banner?.[0]?.originFileObj) {
              const { data } = await uploadSingleFile({ image: values.shop_banner[0].originFileObj });
              shop_banner = data?.image || "";
            }
            await updateUser({
              body: {
                ...user,
                shop_name: values.shop_name,
                shop_address: values.shop_address,
                shop_image,
                shop_banner,
              },
            });
            getUser();
            setOpen(false);
          } catch (err) {
            console.error("Error updating user", err);
          }
        }}
        >
        <FormInput label="Shop Name" name="shop_name" placeholder="Enter Shop Name" required />
        <FormInput label="Shop Address" name="shop_address" placeholder="Enter Shop Address" required />
        <div className="flex flex-col sm:flex-row gap-4">
        <MultipleImageInput label="Shop Logo" name="shop_image" max={1} required />
        <MultipleImageInput label="Shop Banner" name="shop_banner" max={1} required />
        </div>
        <div className="">
            <SubmitButton type="submit" className="col-span-2">Update Shop</SubmitButton>
        </div>
        </Form>
     </Modal>
    </>
  )
}

export default ShopInfoContent