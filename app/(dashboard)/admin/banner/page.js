"use client";
import React, { useState } from 'react'
import TitleBar from '@/app/components/admin/common/title-bar';
import { fetchBanner, updateBanner,deleteBanner,createBanner, uploadSingleFile } from '@/app/helpers/backend';
import { useAction, useFetch } from '@/app/helpers/hooks';
import Table, { TableImage } from '@/app/components/common/table';
import Link from 'next/link';
import { TbWorldWww } from 'react-icons/tb';
import { Form, Modal, Switch } from 'antd';
import SubmitButton from '@/app/components/admin/common/submit-button';
import FormInput, { HiddenInput } from '@/app/components/form/form-input';
import Button from '@/app/components/admin/common/button';
import MultipleImageInput from '@/app/components/form/multiImage';

const Page = () => {
    const [data, getData, { loading }] = useFetch(fetchBanner);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
    const [form] = Form.useForm();
    const columns = [
        {
        text: "Image",
        dataField: "image",
        formatter: (d, _) => (
            <TableImage url={_?.image || "/default.png"} />
        ),
        },
      {
        text: "Name",
        dataField: "name",
        formatter: (_, d) => <span className='capitalize'>{d?.name}</span>
    },
        {
            text: "URL",
            dataField: "url",
            formatter: (_, d) => <Link href={d?.url} target='_blank' className='capitalize flex text-green-400 items-center'><TbWorldWww size={30}/></Link>
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
                        await useAction(
                            updateBanner,
                            { ...payload, body: { status: e, _id: _?._id } },
                            () => {
                                getData();
                            }
                        );
                    }}
                />
            ),
        },
]
    return (
    <div>
      <TitleBar title={"Banner"} />

    <Table 
    data={data}
    columns={columns}
    onReload={getData}
    action={
        <Button onClick={() => {
            setOpen(true)
            setEdit(false)
            form.resetFields()
        }}>Add Banner</Button>
    }
   onEdit={(data) => {
    setOpen(true);
    setEdit(true);
    const formattedData = {
        ...data,
        image: data.image ? [{ url: data.image }] : [],
    };

    form.setFieldsValue(formattedData);
}}
    onDelete={deleteBanner}
    loading={loading}
    pagination
    indexed={true}
    />
    <Modal title={edit ? "Edit Banner" : "Add Banner"} open={open} onCancel={() => setOpen(false)} footer={false}>
        <Form form={form} layout='vertical' onFinish={async (values) => {
            if (values.image?.[0]?.originFileObj) {
                    const { data } = await uploadSingleFile({
                        image: values.image[0].originFileObj,
                    });
                    values.image = data?.image || "";
                } else {
                    values.image = values.image?.[0]?.url || "";
                }
            const payload = {
                body: {
                    image: values.image,
                    name: values.name,
                    url: values.url,
                    status: false,
                      ...(edit && { _id: values?._id }),
                },
            };
            useAction(edit ? updateBanner : createBanner, payload)
                .then(() => {
                    getData();
                    setOpen(false);
                })
                .catch((err) => {
                    console.error(err);
                });
        }}>
        {edit && <HiddenInput name="_id" />}
            <FormInput name="name" label="Name" required />
            <FormInput name="url" label="URL" required />
            <MultipleImageInput
    label="Image"
    name="image"
    required
>
    <div className="flex flex-col items-center justify-center">
        <span className="text-xs text-gray-500">Recommended ratio: 1320x416</span>
    </div>
</MultipleImageInput>
            <div className="flex justify-end mt-2">
                <SubmitButton>
                {edit ? "Update" : "Create"}
            </SubmitButton>
            </div>
        </Form>
        </Modal>
    </div>
  )
}

export default Page
