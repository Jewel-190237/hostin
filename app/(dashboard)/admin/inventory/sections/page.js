'use client'
import Button from '@/app/components/admin/common/button'
import SubmitButton from '@/app/components/admin/common/submit-button'
import TitleBar from '@/app/components/admin/common/title-bar'
import Table, { TableImage } from '@/app/components/common/table'
import FormInput, { HiddenInput } from '@/app/components/form/form-input'
import MultipleImageInput from '@/app/components/form/multiImage'
import { useI18n } from '@/app/context/i18n'
import { fetchsection, uploadSingleFile, createsection, deletesection, updatesection } from '@/app/helpers/backend'
import { useAction, useFetch } from '@/app/helpers/hooks'
import { noSelected } from '@/app/helpers/utils'
import { Checkbox, Form, Modal, Switch } from 'antd'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [data, getData, { loading }] = useFetch(fetchsection)
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [imgLoading, setImgLoading] = useState(false);
    const [form] = Form.useForm()
    let { languages, langCode } = useI18n();
    const [selectedLang, setSelectedLang] = useState(undefined);
    const columns = [
        {
            text: "Image",
            dataField: "marketing_image",
            formatter: (d, _) => <TableImage url={_?.marketing_image || "/default.png"} />,
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
                            updatesection,
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
            <TitleBar title={"Product Sections"} />
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
                        {"Add Sections"}
                    </Button>
                }
                onEdit={(data) => {
                    const formattedData = {
                        ...data,
                        marketing_image: data.marketing_image
                            ? [
                                {
                                    uid: '-1',
                                    name: 'image.png',
                                    status: 'done',
                                    url: data.marketing_image,
                                },
                            ]
                            : [],
                    };

                    form.setFieldsValue(formattedData);
                    setOpen(true);
                    setEdit(true);
                }}
                onDelete={deletesection}
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
                        let simage = imageUrl;
                        if (values?.marketing_image?.[0]?.originFileObj) {
                            setImgLoading(true);
                            try {
                                const { data } = await uploadSingleFile({
                                    image: values.marketing_image[0].originFileObj, 
                                    image_name: "marketing_image",
                                });
                                simage = data?.image || "";
                                setImageUrl(simage);
                            } catch (error) {
                                console.error("Image upload failed:", error);
                            } finally {
                                setImgLoading(false);
                            }
                        } else if (values?.marketing_image?.[0]?.url) {
                            simage = values.marketing_image[0].url; 
                        }
                        const payload = {
                            body: {
                                ...values,
                                name: values.name,
                                marketing_image: simage,
                                marketing_link: values.marketing_link,
                                status: values.status,
                            },
                        };
                        await useAction(
                            edit ? updatesection : createsection,
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
                    <FormInput name="marketing_link" label="marketing link" />
                    <MultipleImageInput name={"marketing_image"} label={"Image"} />
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