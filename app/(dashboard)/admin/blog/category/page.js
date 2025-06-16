'use client'
import { Form, Modal, Tooltip } from 'antd'
import TitleBar from '@/app/components/admin/common/title-bar'
import { fetchBlogCategory, createBlogCategory, updateBlogCategory, deleteBlogCategory } from '@/app/helpers/backend'
import React, { useEffect, useState } from 'react'
import { noSelected } from '@/app/helpers/utils'
import { useAction, useFetch } from '@/app/helpers/hooks'
import Table from '@/app/components/common/table'
import Button from '@/app/components/admin/common/button'
import { useI18n } from '@/app/context/i18n'
import FormInput, { HiddenInput } from '@/app/components/form/form-input'
import SubmitButton from '@/app/components/admin/common/submit-button'

const Page = () => {
    const [data, getData, { loading }] = useFetch(fetchBlogCategory)
    const [open, setOpen] = useState(false)
    let { languages, langCode } = useI18n();
    const [selectedLang, setSelectedLang] = useState(undefined);
    useEffect(() => {
        setSelectedLang(langCode);
    }, [langCode]);
    const [form] = Form.useForm()
    const [edit, setEdit] = useState(false)
    const columns = [
        {
            text: "name",
            dataField: "name",
            formatter: (_, d) => <span className='capitalize'>{(d?.name[langCode])}</span>
        },
        {
            text: "description",
            dataField: "description",
            formatter: (_, d) => {
                const desc = d?.description[langCode] || "";
                const shouldTruncate = desc.length > 20;
                return (
                    <Tooltip title={shouldTruncate ? desc : ""}>
                        <span className="capitalize">
                            {shouldTruncate ? desc.slice(0, 20) + "..." : desc}
                        </span>
                    </Tooltip>
                );
            }
        },
    ];
    return (
        <div>
            <TitleBar title={"Blog Category"} />
            <Table
                data={data}
                columns={columns}
                action={
                    <Button onClick={() => {
                        setOpen(true)
                        setEdit(false)
                        form.resetFields()
                    }}>Add Category</Button>
                }
                onEdit={(data) => {
                    const formattedData = {
                        ...data,
                        name: data?.name,
                        description: data?.description,
                    };
                    form.setFieldsValue(formattedData);
                    setOpen(true);
                    setEdit(true);
                }}
                pagination
                indexed={true}
                onDelete={deleteBlogCategory}
                loading={loading}
                onReload={getData}
            />

            <Modal
                title={edit ? "Edit Blog Category" : "Add Blog Category"}
                open={open}
                onCancel={() => setOpen(false)}
                footer={false}
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
                    layout="vertical"
                    onFinish={async (values) => {

                        const payload = {
                            body: {
                                ...values,
                                name: values.name,
                                description: values.description,
                                //  ...(edit && { _id: values?._id }),

                            }
                        }
                        useAction(edit ? updateBlogCategory : createBlogCategory, payload);
                        form.resetFields();
                        setOpen(false);
                        getData();
                    }}

                >
                    {edit && <HiddenInput name="_id" />}
                    {languages?.map((l, index) => (
                        <div key={index} style={{ display: l.code === selectedLang ? "block" : "none" }}>
                            <FormInput name={["name", l.code]} label="Name" required={true} />
                            <FormInput name={["description", l.code]} label="Description" required={true} />
                        </div>

                    ))}
                    <SubmitButton onClick={() => noSelected({ form, setSelectedLang })} type="submit">Submit</SubmitButton>
                </Form>
            </Modal>
        </div>
    )
}

export default Page