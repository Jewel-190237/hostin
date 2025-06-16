'use client'
import Button from '@/app/components/admin/common/button'
import SubmitButton from '@/app/components/admin/common/submit-button'
import TitleBar from '@/app/components/admin/common/title-bar'
import Table, { TableImage } from '@/app/components/common/table'
import FormInput, { HiddenInput } from '@/app/components/form/form-input'
import MultipleImageInput from '@/app/components/form/multiImage'
import { useI18n } from '@/app/context/i18n'
import { deleteBrand, fetchBrand, updateBrand, createBrand, uploadSingleFile } from '@/app/helpers/backend'
import { useAction, useFetch } from '@/app/helpers/hooks'
import { columnFormatter, noSelected } from '@/app/helpers/utils'
import { Checkbox, Form, Modal, Switch } from 'antd'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [data, getData, { loading }] = useFetch(fetchBrand)
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(" ");
    const [imgLoading, setImgLoading] = useState(false);
    const [form] = Form.useForm()
    let { languages, langCode } = useI18n();
    const [selectedLang, setSelectedLang] = useState(undefined);
    const columns = [
        {
            text: "Image",
            dataField: "image",
            formatter: (d, _) => <TableImage url={_?.image || "/default.png"} />,
        },
        {
            text: "Name",
            dataField: "name",
            formatter: (d, _) => <span className="capitalize">{(_?.name[langCode])}</span>,
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
                            updateBrand,
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
    useEffect(() => {
        setSelectedLang(langCode);
    }, [langCode]);
    return (
        <div>
            <TitleBar title={"Product Brand"} />
            <Table
                data={data}
                columns={columns}
                loading={loading}
                pagination
                action={
                    <Button
                        onClick={() => {
                            form.resetFields();
                            setOpen(true);
                            setEdit(false);
                        }}
                    >
                        {"Add Brand"}
                    </Button>
                }
                onEdit={(data) => {
                    const formattedData = {
                        ...data,
                        image: data.image
                            ? [
                                {
                                    uid: '-1',
                                    name: 'image.png',
                                    status: 'done',
                                    url: data.image,
                                },
                            ]
                            : [],
                    };

                    form.setFieldsValue(formattedData);
                    setOpen(true);
                    setEdit(true);
                }}
                onDelete={deleteBrand}
                onReload={getData}
                indexed
            />

            <Modal
                title={edit ? "Edit Brand" : "Add Brand"}
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <div className="flex justify-start flex-wrap gap-3 mt-4">
                    {languages?.map((l, index) => (
                        <button
                            onClick={() => setSelectedLang(l.code)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${l.code === selectedLang
                                ? "bg-[#0d766d] text-white"
                                : "bg-gray-200 text-[#0d766d] hover:bg-gray-300"
                                }`}
                            key={index}
                        >
                            {l.name}
                        </button>
                    ))}
                </div>
                <Form
                    form={form}
                    onFinish={async (values) => {
                        setSubmitLoading(true);
                        let imageurl = imageUrl;
                        if (values?.image?.[0]?.originFileObj) {
                            setImgLoading(true);
                            try {
                                const { data } = await uploadSingleFile({
                                    image: values.image[0].originFileObj,
                                    image_name: "image",
                                });
                                imageurl = data?.image || "";
                                setImageUrl(imageurl);
                            } catch (error) {
                                console.error("Image upload failed:", error);
                            } finally {
                                setImgLoading(false);
                            }
                        } else if (values?.image?.[0]?.url) {
                            imageurl = values.image[0].url;
                        }
                        const payload = {
                            body: {
                                ...values,
                                name: values.name,
                                image: imageurl,
                                status: values.status,
                            },
                        };
                        await useAction(
                            edit ? updateBrand : createBrand,
                            payload,
                            () => {
                                setOpen(false);
                                getData();
                            }
                        );
                    }}
                    layout="vertical"
                >
                    {edit && <HiddenInput name="_id" />}

                    {languages?.map((l, index) => (
                        <div
                            key={index}
                            style={{
                                display: l.code === selectedLang ? "block" : "none",
                            }}
                        >
                            <FormInput name={['name', l.code]} label="Name" required={true} />
                        </div>
                    ))}

                    <MultipleImageInput name={"image"} label={"Image"} />
                    <Form.Item name="status" valuePropName="checked">
                        <Checkbox>Status</Checkbox>
                    </Form.Item>

                    <SubmitButton type="submit" className="mt-2" onClick={() => noSelected({ form, setSelectedLang })} >
                        {edit ? "Update" : "Create"}
                    </SubmitButton>
                </Form>
            </Modal>
        </div>
    )
}

export default Page