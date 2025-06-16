"use client"
import Button from '@/app/components/admin/common/button';
import TitleBar from '@/app/components/admin/common/title-bar';
import FormInput, { HiddenInput } from '@/app/components/form/form-input';
import MultipleImageInput from '@/app/components/form/multiImage';
import { useAction, useFetch } from '@/app/helpers/hooks';
import { Form, Checkbox, Select } from 'antd';
import React, { useEffect } from 'react';
import '@ant-design/v5-patch-for-react-19';
import { fetchSettings, postSettings, uploadMultipleFile, uploadSingleFile } from '@/app/helpers/backend';
const page = () => {
    const [form] = Form.useForm();
    const [setting, getSetting] = useFetch(fetchSettings);

    useEffect(() => {
        if (setting) {
            const socialMediaLinks = setting?.social_media_link || [];
            const socialMediaMap = socialMediaLinks.reduce((acc, item) => {
                acc[item.name] = item.link;
                return acc;
            }, {});
            form.setFieldsValue({
                    site_name: setting?.site_name || "",
                    site_description: setting?.site_description || "",
                    site_email: setting?.site_email || "",
                    site_phone: setting?.site_phone || "",
                    site_address: setting?.site_address || "",
                    currency_code: setting?.currency_code || "",
                    currency_symbol: setting?.currency_symbol || "",
                    site_footer: setting?.site_footer || "",
                    server_side_url: setting?.server_side_url || "",
                    client_side_url: setting?.client_side_url || "",
                    otp_required: setting?.otp_required || false,
                    otp_verification_type: {
                        value: setting?.otp_verification_type || 'email',
                    },
                    site_logo: setting?.site_logo
                        ? [{
                            uid: '-1',
                            name: 'image.png',
                            status: 'done',
                            url: setting?.site_logo
                        }]
                        : [],
                    _id: setting?._id || undefined,
                    partner: setting?.partner?.map((url, index) => ({
                        uid: index.toString(),
                        name: `partner-${index + 1}.png`, 
                        status: 'done',
                        url: url
                    })) || [],
                    Facebook: socialMediaMap['Facebook'] || "", 
                    Instagram: socialMediaMap['Instagram'] || "",
                    Twitter: socialMediaMap['Twitter'] || "",
                    
            });
        }
    }, [setting]);

    return (
        <div>
            <TitleBar title={"General Settings"} />
            <div className='bg-white p-4 rounded-md'>
            <Form form={form} layout='vertical' onFinish={async (values) => {
    // Handle site_logo upload
    if (values.site_logo?.[0]?.originFileObj) {
        const { data } = await uploadSingleFile({
            image: values.site_logo[0].originFileObj,
        });
        values.site_logo = data?.image || "";
    } else {
        values.site_logo = values.site_logo?.[0]?.url || "";
    }

    if (values.partner?.length > 0) {
        const imagesToUpload = values.partner
            .filter((file) => file.originFileObj)
            .map((file) => file.originFileObj);

        if (imagesToUpload.length > 0) {
            const { data } = await uploadMultipleFile({
                images: imagesToUpload,
            });
            const uploadedImages = data?.images || [];
            values.partner = [
                ...uploadedImages.map((url, index) => ({
                    url,
                    name: values.partner[index]?.name || `image-${index + 1}.png`,
                })),
                ...values.partner
                    .filter((file) => !file.originFileObj)
                    .map((file) => ({
                        url: file.url,
                        name: file.name || "existing-image.png",
                    })),
            ];
        } else {
            values.partner = values.partner.map((file) => ({
                url: file.url,
                name: file.name || "existing-image.png",
            }));
        }
    } else {
        values.partner = [];
    }

    const payload = {
        body: {
            site_name: values?.site_name,
            site_description: values?.site_description,
            site_address: values?.site_address,
            site_email: values?.site_email,
            site_phone: values?.site_phone,
            currency_code: values?.currency_code,
            currency_symbol: values?.currency_symbol,
            site_footer: values?.site_footer,
            server_side_url: values?.server_side_url,
            client_side_url: values?.client_side_url,
            otp_required: values?.otp_required || false,
            otp_verification_type: values?.otp_verification_type?.value || 'email',
            file_upload_type: "s3",
            social_media_link: [
                {
                    name: 'Facebook',
                    link: values?.Facebook || ""
                },
                {
                    name: 'Instagram',
                    link: values?.Instagram || ""
                },
                {
                    name: 'Twitter',
                    link: values?.Twitter || ""
                }
            ],
            site_logo: values?.site_logo,
            partner: values?.partner.map((file) => file.url),
        }
    };

    // Submit payload
    await useAction(postSettings, payload, () => {
        getSetting();
    });
}}>
                    <HiddenInput name={"_id"} />
                    <div className='grid md:grid-cols-2 lg:gap-4 gap-2'>
                        <FormInput name={"site_name"} label={"Title"} placeholder={"Please input site title"} />
                        <FormInput name={"site_description"} label={"Description"} placeholder={"Please input site description"} />
                        <FormInput name={"currency_symbol"} label={"Currency Symbol"} placeholder={"Please input currency symbol"} />
                        <FormInput name={"currency_code"} label={"Currency Code"} placeholder={"Please input currency code"} />
                        <FormInput name={"site_email"} label={"Email"} placeholder={"Please input site email"} />
                        <FormInput name={"site_phone"} label={"Phone"} placeholder={"Please input site phone number"} />
                        <FormInput name={"site_address"} label={"Address"} placeholder={"Please input site address"} />
                        <FormInput name={"site_footer"} label={"Copyright Text"} placeholder={"Please input site footer"} />
                        <FormInput name={"client_side_url"} label={"Client Side URL"} placeholder={"Please input client side URL"} />
                        <FormInput name={"server_side_url"} label={"Server Side URL"} placeholder={"Please input server side URL"} />
                        <FormInput name={"Facebook"} label={"Facebook"} placeholder={"Please input facebook url"} />
                        <FormInput name={"Twitter"} label={"Twitter"} placeholder={"Please input twitter url"} />
                        <FormInput name={"Instagram"} label={"Instagram"} placeholder={"Please input instagram url"} />
                        <Form.Item name="otp_verification_type" label="OTP Verification Type">
                            <Select
                                labelInValue
                                className=''
                                style={{ width: '100%' }}
                                options={[
                                    {
                                        value: 'email',
                                        label: 'Email',
                                    },
                                    {
                                        value: 'phone',
                                        label: 'Phone',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <div className="flex gap-8 items-center flex-wrap">

                            <MultipleImageInput name="site_logo" label="Logo" required={false} />
                            <Form.Item name="otp_required" valuePropName="checked" >
                                <Checkbox>Enable OTP Verification During Signup</Checkbox>
                            </Form.Item>
                        </div>
                        <MultipleImageInput name="partner" label="Partners" max={6} required={false} />

                    </div>

                    <Button>Update</Button>
                </Form>
            </div>
        </div>
    );
           
};

export default page;
