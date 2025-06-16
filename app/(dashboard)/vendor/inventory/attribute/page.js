'use client'
import Button from '@/app/components/admin/common/button'
import TitleBar from '@/app/components/admin/common/title-bar'
import Table from '@/app/components/common/table'
import FormInput, { HiddenInput } from '@/app/components/form/form-input'
import { useI18n } from '@/app/context/i18n'
import { fetchAttribute, createAttribute, updateAttribute, deleteAttribute } from '@/app/helpers/backend'
import { useAction, useActionConfirm, useFetch } from '@/app/helpers/hooks'
import { columnFormatter, noSelected } from '@/app/helpers/utils'
import { Checkbox, Form, Input, Modal, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import SubmitButton from '@/app/components/admin/common/submit-button'
const Page = () => {
    const [data, getData, { loading }] = useFetch(fetchAttribute)
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [form] = Form.useForm()
    let { languages, langCode } = useI18n();
    const [selectedLang, setSelectedLang] = useState(undefined);
    useEffect(() => {
        setSelectedLang(langCode);
    }, [langCode]);
    const columns = [
        {
            text: "Name",
            dataField: "name",
            formatter: (d, _) => <span className="capitalize">{(_?.name[langCode])}</span>,
        },
        {
            text: "values",
            dataField: "values",
            formatter: (d, _) => <span>{_?.values?.join(", ")}</span>,
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
                            updateAttribute,
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
            <TitleBar title={"Product Attribute"} />
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
                        {"Add Attribute"}
                    </Button>
                }
                onEdit={(data) => {
                    const formattedData = {
                        ...data,
                        name: data.name,
                        color: data.values,
                        status: data.status,
                    };

                    form.setFieldsValue(formattedData);
                    setOpen(true);
                    setEdit(true);
                }}
                onDelete={deleteAttribute}
                onReload={getData}
                indexed
            />

            <Modal open={open} onCancel={() => setOpen(false)} footer={null} title={edit ? "Edit Attribute" : "Add Attribute"}>
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
                        const payload = {
                            body: {
                                _id: edit ? values._id : undefined,
                                name: values.name,
                                values: values.values, // Correctly map the 'values' field
                                status: values.status,
                            },
                        };
                        await useAction(
                            edit ? updateAttribute : createAttribute,
                            payload,
                            () => {
                                getData();
                                setOpen(false);
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
                    <div className="mt-4">
                        <Form.List name="values"
                        initialValue={[""]} 
                        >
                            {(fields, { add, remove }) => (
                                <div>
                                    <div className="flex justify-end">
                                        <button
                                            className="bg-[#0d766d] text-white flex items-center gap-2 px-3 py-1 mb-4 rounded-md"
                                            type="button"
                                            onClick={() => add()}
                                        >
                                          <PlusOutlined />  Add Value
                                        </button>
                                    </div>
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                                {fields.map(({ key, name, ...restField }) => (
                                        <div key={key} className="flex items-center gap-2 mb-2">
                                            <Form.Item
                                                {...restField}
                                                name={name}
                                                rules={[{ required: true, message: "Enter a value" }]}
                                            >
                                                <Input placeholder="Enter value" />
                                            </Form.Item>
                                            <button
                                            className="bg-[#ff0000b6] text-white flex items-center gap-2 px-3 py-1 rounded-md mb-5"
                                            type="button"
                                            onClick={() => remove(name)}
                                        >
                                          <MinusCircleOutlined />
                                        </button>
                                        </div>
                                    ))}
                                </div>
                                </div>
                            )}
                        </Form.List>
                    </div>
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
