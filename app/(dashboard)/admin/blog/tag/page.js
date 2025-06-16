'use client'
import { Form, Modal } from 'antd'
import TitleBar from '@/app/components/admin/common/title-bar'
import { fetchBlogTag, createBlogTag, updateBlogTag, deleteBlogTag } from '@/app/helpers/backend'
import React, { useEffect, useState } from 'react'
import { columnFormatter,noSelected } from '@/app/helpers/utils'
import { useAction, useFetch } from '@/app/helpers/hooks'
import Table from '@/app/components/common/table'
import Button from '@/app/components/admin/common/button'
import { useI18n } from '@/app/context/i18n'
import FormInput, { HiddenInput } from '@/app/components/form/form-input'
import SubmitButton from '@/app/components/admin/common/submit-button'

const Page = () => {
    const [data, getData, { loading }] = useFetch(fetchBlogTag)
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
    ];
    return (
        <div>
            <TitleBar title={"Blog Tag"} />
            <Table
                data={data}
                columns={columns}
                loading={loading}
                  onReload={getData}
                action={
                    <Button onClick={() => {
                        setOpen(true)
                        setEdit(false)
                        form.resetFields()
                    }}>Add Tag</Button>
                }
              onEdit={(data) => {
                  const formattedData = {
                      ...data,
                        name: data?.name,
                  };
                  form.setFieldsValue(formattedData);
                  setOpen(true);
                  setEdit(true);
              }}
              onDelete={deleteBlogTag}
              pagination
              indexed={true}
                
            />

            <Modal
                title={edit ? "Edit Blog Tag" : "Add Blog Tag"}
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
                    onFinish={ async (values) => {
                       
                const payload = {
                           body : {
                             ...values,
                            name: values.name,
                           }
                    }
                useAction(edit ? updateBlogTag : createBlogTag, payload);
                form.resetFields();
                setOpen(false);
                getData();
                    }}
            
                >
                     {edit && <HiddenInput name="_id" />}
                    {languages?.map((l, index) => (
                        <div key={index} style={{ display: l.code === selectedLang ? "block" : "none" }}>
                            <FormInput name={["name", l.code]} label="Name" required={true} />
                            
                        </div>

                    ))}
                    <SubmitButton onClick={() => noSelected({ form, setSelectedLang })} type="submit">Submit</SubmitButton>
                </Form>
            </Modal>
        </div>
    )
}

export default Page