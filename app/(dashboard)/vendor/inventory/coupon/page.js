'use client';
import Button from '@/app/components/admin/common/button';
import SubmitButton from '@/app/components/admin/common/submit-button';
import TitleBar from '@/app/components/admin/common/title-bar'
import Table, { TableImage } from '@/app/components/common/table'
import FormInput, { HiddenInput } from '@/app/components/form/form-input';
import FormDatePicker from '@/app/components/form/form-picker';
import MultipleImageInput from '@/app/components/form/multiImage';
import FormSelect from '@/app/components/form/select';
import { fetchCoupons, deleteCoupons, updateCoupons, createCoupons, uploadSingleFile } from '@/app/helpers/backend';
import { useAction, useActionConfirm, useFetch } from '@/app/helpers/hooks';
import { Checkbox, Form, Modal, Switch } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react'

const Page = () => {
    const [data, getData, { loading }] = useFetch(fetchCoupons);
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(" ");
    const [imgLoading, setImgLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [form] = Form.useForm();
    const columns = [
        {
            text: "Image",
            dataField: "banner",
            formatter: (d, _) => (
                <TableImage url={_?.banner || "/default.png"} />
            ),
        },
        {
            text: "Name",
            dataField: "name",
            formatter: (d, _) => <span className="capitalize">{(_?.name)}</span>,
        },
        {
            text: "Code",
            dataField: "code",
            formatter: (d, _) => <span className="capitalize">{(_?.code)}</span>,
        },
        {
            text: "Discount",
            dataField: "discount",
            formatter: (d, _) => <span className="capitalize">{(_?.discount)}</span>,
        },
        {
            text: "discount Type",
            dataField: "type",
            formatter: (d, _) => <span className="capitalize">{(_?.type)}</span>,
        },
        {
            text: "expire at",
            dataField: "expire_at",
            formatter: (d, _) => (
                <span className="capitalize">
                    {_?.expire_at ? dayjs(_?.expire_at).isValid() ? dayjs(_?.expire_at).format('MMMM D, YYYY') : "Invalid Date" : "N/A"}
                </span>
            ),
        },
        {
            text: "usage limit per user",
            dataField: "usage_limit_per_user",
            formatter: (d, _) => <span className="capitalize">{(_?.usage_limit_per_user)}</span>,

        },
        {
            text: "max order limit",
            dataField: "minimum_order_amount",
            formatter: (d, _) => <span className="capitalize">{(_?.minimum_order_amount)}</span>,
        },
        {
            text: "Status",
            dataField: "status",
            formatter: (d, _) => (
                <Switch
                    checkedChildren={"Active"}
                    unCheckedChildren={"Inactive"}
                    checked={_?.status}
                    onChange={async (e) => {
                        const payload = {
                            body: {
                                status: e,
                                _id: _?._id,
                            },
                        };
                        await useActionConfirm(
                            updateCoupons,
                            { ...payload, body: { status: e, _id: _?._id } },
                            () => {
                                getData();
                            }
                        );
                    }}
                />
            ),
        },
    ];
    return (
        <div>
            <TitleBar title={"Coupons"} />
            <Table
                data={data}
                columns={columns}
                onReload={getData}
                loading={loading}
                action={
                    <Button onClick={() => {
                        setOpen(true)
                        setEdit(false);
                        form.resetFields();
                    }}>Add Coupon</Button>
                }
         onEdit={(data) => {
    const formattedData = {
        ...data,
        banner: data.banner
            ? [
                {
                    uid: '-1',
                    name: 'banner.png',
                    status: 'done',
                    url: data.banner,
                },
            ]
            : [],
        expire_at: data.expire_at ? dayjs(data.expire_at) : null,
    };
    form.setFieldsValue(formattedData);
    setOpen(true);
    setEdit(true);
}}
                onDelete={deleteCoupons}
                indexed
                pagination />

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                width={700}
                title={edit ? "Edit Coupon" : "Add Coupon"}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={async (values) => {
                        setSubmitLoading(true);
                        let imageurl = imageUrl;
                        if (values?.banner?.[0]?.originFileObj) {
                            setImgLoading(true);
                            try {
                                const { data } = await uploadSingleFile({
                                    image: values.banner[0].originFileObj,
                                    image_name: "banner",
                                });
                                imageurl = data?.image || "";
                                setImageUrl(imageurl);
                            } catch (error) {
                                console.error("Image upload failed:", error);
                            } finally {
                                setImgLoading(false);
                            }
                        } else if (values?.banner?.[0]?.url) {
                            imageurl = values.banner[0].url;
                        }
                        const payload = {
                            body: {
                                name: values?.name,
                                code: values?.code ? values?.code : null,
                                discount: Number(values?.discount ? values?.discount : null),
                                type: values?.type ? values?.type : null,
                                usage_limit_per_user: Number(values?.usage_limit_per_user ? values?.usage_limit_per_user : null),
                                minimum_order_amount: Number(values?.minimum_order_amount ? values?.minimum_order_amount : null),
                                banner: imageurl,
                                status: values?.status ? true : false,
                                expire_at: values?.expire_at ? dayjs(values?.expire_at).format('YYYY-MM-DD') : null,
                                 ...(edit && { _id: values?._id }),
                            },
                        };
                        await useAction(
                            edit ? updateCoupons : createCoupons,
                            payload,
                            () => {
                                setOpen(false);
                                getData();
                            }
                        );

                        setSubmitLoading(false);
                    }}
                >
                    <div className="grid grid-cols-2 gap-4">
                        {edit && <HiddenInput name="_id" />}
                        <FormInput name="name" label="Name" />
                        <FormInput name="code" label="Code" />
                        <FormInput name="discount" label="Discount" type={"number"} />
                        <FormSelect name="type" label="Type" options={[
                            { label: 'Percentage', value: 'percentage' },
                            { label: 'Flat', value: 'flat' },
                        ]} />
                        <FormInput name="usage_limit_per_user" label="Usage Limit Per User" type={"number"} />
                        <FormInput name="minimum_order_amount" label="Minimum Order Amount" type={"number"} />
                        <FormDatePicker name="expire_at" label="Expire At" className='w-full py-2' />
                        <MultipleImageInput name={"banner"} label={"banner"} required={true} />
                        <Form.Item name="status" valuePropName="checked">
                            <Checkbox>Status</Checkbox>
                        </Form.Item>
                    </div>
                    <div className="flex justify-end">
                        <SubmitButton type='submit' >
                            Submit
                        </SubmitButton>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default Page