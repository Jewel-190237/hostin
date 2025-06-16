"use client"
import Button from '@/app/components/admin/common/button'
import SubmitButton from '@/app/components/admin/common/submit-button'
import TitleBar from '@/app/components/admin/common/title-bar'
import Table, { TableImage } from '@/app/components/common/table'
import FormInput, { HiddenInput } from '@/app/components/form/form-input'
import MultipleImageInput from '@/app/components/form/multiImage'
import FormSelect from '@/app/components/form/select'
import TextEditor from '@/app/components/form/TextEditor'
import { useI18n } from '@/app/context/i18n'
import { fetchBlog, updateBlog, deleteBlog, createBlog, fetchBlogCategory, fetchBlogTag, uploadSingleFile } from '@/app/helpers/backend'
import { useAction, useActionConfirm, useFetch } from '@/app/helpers/hooks'
import { noSelected } from '@/app/helpers/utils'
import { Form, Modal, Switch } from 'antd'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [data, getData, { loading }] = useFetch(fetchBlog)
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    let { languages, langCode } = useI18n();
    const [selectedLang, setSelectedLang] = useState(undefined);
    const [category, getCategory] = useFetch(fetchBlogCategory)
    const [imageUrl, setImageUrl] = useState("");
    const [cardImage, setCardImage] = useState("");
    const [imgLoading, setImgLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [tag, getTag] = useFetch(fetchBlogTag)
    const [form] = Form.useForm()
    useEffect(() => {
        setSelectedLang(langCode);
    }, [langCode]);

    const columns = [
        {
            text: "image",
            dataField: "banner_image",
            formatter: (_, d) => <TableImage url={d?.banner_image || "/default.png"} />
        },
        {
            text: "title",
            dataField: "title",
            formatter: (_, d) => <span className='capitalize'>{(d?.title[langCode])}</span>
        },
        {
            text: "category",
            dataField: "category",
            formatter: (_, d) => <span className='capitalize'>{(d?.category?.name[langCode])}</span>
        },

        {
            text: "Active",
            dataField: "is_active",
            formatter: (d, _) => (
                <Switch
                    checkedChildren={"Active"}
                    unCheckedChildren={"Inactive"}
                    checked={_?.is_active}
                    onChange={async (e) => {
                        const payload = {
                            body: {
                                is_active: e,
                                _id: _?._id,
                            },
                        };
                        await useActionConfirm(
                            updateBlog,
                            { ...payload, body: { is_active: e, _id: _?._id } },
                            () => {
                                getData();
                            }
                        );
                    }}
                />
            ),
        },
        {
            text: "leatest",
            dataField: "is_latest",
            formatter: (d, _) => (
                <Switch
                    checkedChildren={"Latest"}
                    unCheckedChildren={"Not Latest"}
                    checked={_?.is_latest}
                    onChange={async (e) => {
                        const payload = {
                            body: {
                                is_latest: e,
                                _id: _?._id,
                            },
                        };
                        await useActionConfirm(
                            updateBlog,
                            { ...payload, body: { is_latest: e, _id: _?._id } },
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
            <TitleBar title="Blog" />
            <Table
                data={data}
                onReload={getData}
                columns={columns}
                action={
                    <Button onClick={() => {
                        setOpen(true)
                        setEdit(false)
                        form.resetFields()
                    }}>Add Blog</Button>
                }
                onEdit={(data) => {
                    const formattedData = {
                        ...data,
                        title: data?.title,
                        short_description: data?.short_description,
                        description: data?.description,
                        category: data?.category?._id,
                        tags: data?.tags?.map((t) => t?._id),
                        banner_image: [{ url: data?.banner_image }],
                        card_image: [{ url: data?.card_image }],
                    };
                    form.setFieldsValue(formattedData);
                    setOpen(true);
                    setEdit(true);
                }}
                pagination
                indexed={true}
                onDelete={deleteBlog}
                loading={loading}
            />

            <Modal title={edit ? "Edit Blog" : "Add Blog"} width={800} open={open} onCancel={() => setOpen(false)} footer={false}>

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
                <Form form={form} layout='vertical' onFinish={async (values) => {
                    setSubmitLoading(true);
                    let imageurl = imageUrl;
                    let cardimage = cardImage;
                    if (values?.banner_image?.[0]?.originFileObj) {
                        setImgLoading(true);
                        try {
                            const { data } = await uploadSingleFile({
                                image: values.banner_image[0].originFileObj,
                                image_name: "banner_image",
                            });
                            imageurl = data?.image || "";
                            setImageUrl(imageurl);
                        } catch (error) {
                            console.error("Image upload failed:", error);
                        } finally {
                            setImgLoading(false);
                        }
                    } else if (values?.banner_image?.[0]?.url) {
                        imageurl = values.banner_image[0].url;
                    }

                    if (values?.card_image?.[0]?.originFileObj) {
                        setImgLoading(true);
                        try {
                            const { data } = await uploadSingleFile({
                                image: values.card_image[0].originFileObj,
                                image_name: "card_image",
                            });
                            cardimage = data?.image || "";
                            setCardImage(cardimage);
                        } catch (error) {
                            console.error("Image upload failed:", error);
                        } finally {
                            setImgLoading(false);
                        }
                    } else if (values?.card_image?.[0]?.url) {
                        cardimage = values.card_image[0].url;
                    }
                    const payload = {
                        body: {
                            ...values,
                            title: values?.title,
                            short_description: values?.short_description,
                            description: values?.description,
                            category: values?.category,
                            tags: values?.tags,
                            banner_image: imageurl,
                            card_image: cardimage,
                            ...(edit && { _id: values?._id })
                        }
                    };
                    console.log("🚀 ~ <Formform={form}layout='vertical'onFinish={ ~ payload:", payload)

                    await useAction(edit ? updateBlog : createBlog, payload, () => {
                        getData();
                        setOpen(false);
                    });
                }}>
                    {edit && <HiddenInput name="_id" />}
                    {languages?.map((l, index) => (
                        <div key={index} style={{ display: l.code === selectedLang ? "block" : "none" }}>
                            <FormInput name={["title", l.code]} label="Title" required={true} />
                            <FormInput name={["short_description", l.code]} label="Short Description" required={true} />
                            <TextEditor name={["description", l.code]} label="Description" textArea rows={4} required={true} />
                        </div>
                    ))}
                    <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
                        <FormSelect name="category" label="Category" required={true} options={
                            category?.docs?.map((d) => ({
                                label: (d?.name[langCode]),
                                value: d?._id
                            }))
                        } />
                        <FormSelect name="tags" label="Tag" required={true} multi={true} options={
                            tag?.docs?.map((d) => ({
                                label: (d?.name[langCode]),
                                value: d?._id
                            }))
                        } />
                    </div>
                    <div className="flex justify-end gap-3">
                        <MultipleImageInput name="banner_image" label="Banner Image" required={true} />
                        <MultipleImageInput name="card_image" label="Card Image" required={true} />
                    </div>
                    <SubmitButton onClick={() => noSelected({ form, setSelectedLang })} type="submit">Submit</SubmitButton>
                </Form>

            </Modal>
        </div>
    )
}

export default Page
