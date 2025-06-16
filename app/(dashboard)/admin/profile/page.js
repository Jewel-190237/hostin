"use client"
import Button from '@/app/components/admin/common/button';
import TitleBar from '@/app/components/admin/common/title-bar';
import FormInput from '@/app/components/form/form-input';
import MultipleImageInput from '@/app/components/form/multiImage';
import { useUser } from '@/app/context/user';
import { updateUser, uploadSingleFile } from '@/app/helpers/backend';
import { useAction } from '@/app/helpers/hooks';
import Form from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';

const page = () => {
    const [form] = Form.useForm();
      const [submitLoading, setSubmitLoading] = useState(false);
      const [imageUrl, setImageUrl] = useState(" ");
      const [imgLoading, setImgLoading] = useState(false);
    const { user,getUser} = useUser()
    useEffect(() => {
        form.setFieldsValue({
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
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
    }, [user, form])
                    
    return (
        <div className=''>
            <TitleBar title={"Admin Profile"} />
            <Form form={form}
                onFinish={async (values) => {
                    setSubmitLoading(true);
            
                    let logoUrl = imageUrl;
                    if (values?.image?.[0]?.originFileObj) {
                        setImgLoading(true);
                        try {
                            const { data } = await uploadSingleFile({
                                image: values.image[0].originFileObj,
                                image_name: "logo",
                            });
                            logoUrl = data?.image || "";
                            setImageUrl(logoUrl);
                        } catch (error) {
                            console.error("Image upload failed:", error);
                        } finally {
                            setImgLoading(false);
                        }
                    } else if (values?.image?.[0]?.url) {
                        // Use the existing image URL if no new file is uploaded
                        logoUrl = values.image[0].url;
                    }
            
                    const payload = {
                        body: {
                            first_name: values.first_name,
                            last_name: values.last_name,
                            email: values.email,
                            phone: values.phone,
                            image: logoUrl, // Ensure this is a string
                        },
                        id: user?.user?.id,
                    };
            
                    await useAction(updateUser, payload, () => {
                        console.log("🚀 ~ awaituseAction ~ payload:", payload);
                        getUser();
                        form.resetFields();
                    });
                }}
                className='px-4 py-10 bg-white rounded-md shadow-md'>
                <div className=' grid md:grid-cols-2 lg:gap-10 gap-2' >
                    <FormInput name={"first_name"} label={"First Name"} placeholder={"Enter your first name"} />
                    <FormInput name={"last_name"} label={"Last Name"} placeholder={"Enter your last name"} />
                </div>
                <div className=' grid md:grid-cols-2 lg:gap-10 gap-2'>
                    <FormInput name={"phone"} label={"Phone Number"} placeholder={"Enter your phone number"} />
                    <FormInput name={"email"} label={"Email"} placeholder={"Enter your email"} />
                </div>
                <MultipleImageInput name={"image"} label={"Image"} />
                <Button>Update</Button>
            </Form>
        </div>
    );
};

export default page;