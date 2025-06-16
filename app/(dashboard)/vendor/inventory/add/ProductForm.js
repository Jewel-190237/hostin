'use client';
import React, { useEffect, useState } from 'react';
import { Checkbox, Form, Switch, Collapse, Select } from "antd"
import { columnFormatter, noSelected } from '@/app/helpers/utils';
import FormInput, { HiddenInput } from '@/app/components/form/form-input';
import MultipleImageInput from '@/app/components/form/multiImage';
import FormSelect from '@/app/components/form/select';
import { useAction } from '@/app/helpers/hooks';
import { uploadMultipleFile, uploadSingleFile, updateProduct, createProduct } from '@/app/helpers/backend';
import TextEditor from '@/app/components/form/TextEditor';
import SubmitButton from '@/app/components/admin/common/submit-button';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useI18n } from '@/app/context/i18n';
const ProductForm = ({ category, section, brand, attribute, productId, getAttribute, languages, selectedLang, setSelectedLang, formData, setFromData, i18n, router, form, edit }) => {
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const {langCode} = useI18n();
    const [attributesState, setAttributesState] = useState([]);
    const docs = attribute?.docs || [];

    const getAttributeValues = (attrId) => {
        const attrObj = attribute?.docs?.find(a => a._id === attrId)
        return attrObj?.values || []
    }
    const [isFreeShipping, setIsFreeShipping] = useState(true);
    useEffect(() => {
        const initialFreeShipping = form.getFieldValue('free_shipping');
        setIsFreeShipping(initialFreeShipping !== undefined ? initialFreeShipping : true);
    }, [form]);
    const calculateFinalPrice = () => {
        const { price, discount, discount_type, vat, tax } = form.getFieldsValue();

        if (price && discount && discount_type) {
            let finalPrice = 0;
            if (discount_type === 'percentage') {
                finalPrice = price - (price * discount) / 100;
            } else if (discount_type === 'flat') {
                finalPrice = price - discount;
            }

            if (vat?.amount && vat?.vat_type) {
                if (vat.vat_type === 'percentage') {
                    finalPrice += (price * vat.amount) / 100;
                } else if (vat.vat_type === 'flat') {
                    finalPrice += vat.amount;
                }
            }
            if (tax?.amount && tax?.tax_type) {
                if (tax.tax_type === 'percentage') {
                    finalPrice += (price * tax.amount) / 100;
                } else if (tax.tax_type === 'flat') {
                    finalPrice += tax.amount;
                }
            }

            form.setFieldsValue({ final_price: finalPrice > 0 ? finalPrice : 0 });
        }
    };


    const handleFinish = async (values) => {
        setLoading(true);
        if (values.thumbnail?.[0]?.originFileObj) {
            const { data } = await uploadSingleFile({
                image: values.thumbnail[0].originFileObj,
            });
            values.thumbnail = data?.image || "";
        } else {
            values.thumbnail = values.thumbnail?.[0]?.url || "";
        }

        if (values.images?.length > 0) {
            const imagesToUpload = values.images
                .filter((file) => file.originFileObj)
                .map((file) => file.originFileObj);

            if (imagesToUpload.length > 0) {
                const { data } = await uploadMultipleFile({
                    images: imagesToUpload,
                });
                const uploadedImages = data?.images || [];
                values.images = [
                    ...uploadedImages.map((url, index) => ({
                        url,
                        name: values.images[index]?.name || `image-${index + 1}.png`,
                    })),
                    ...values.images
                        .filter((file) => !file.originFileObj)
                        .map((file) => ({
                            url: file.url,
                            name: file.name || "existing-image.png",
                        })),
                ];
            } else {
                values.images = values.images.map((file) => ({
                    url: file.url,
                    name: file.name || "existing-image.png",
                }));
            }
        } else {
            values.images = [];
        }
        const groupedAttributes = [];

        docs.forEach(attr => {
            const selectedValues = selected.filter(val => attr.values.includes(val));
            if (selectedValues.length) {
                groupedAttributes.push({
                    name: attr.name,
                    values: selectedValues,
                });
            }
        });
        const payload = {
            body: {
                name: values?.name,
                code: values?.code,
                sku: values?.sku,
                short_description: values?.short_description,
                description: values?.description,
                thumbnail: values?.thumbnail,
                images: values?.images?.map((file) => file?.url),
                category: values?.category,
                brand: values?.brand,
                section: values?.section,
                attributes: attributesState,
                price: Number(values?.price),
                discount_type: values?.discount_type,
                discount: Number(values?.discount),
                final_price: parseFloat(Number(values?.final_price).toFixed(2)),
                quantity: Number(values?.quantity),
                stock: values?.stock === true ? true : false,
                show_stock: values?.show_stock === true ? true : false,
                status: values?.status === true ? true : false,
                free_shipping: isFreeShipping === true ? true : false,
                is_approved: false,
                shipping_days: Number(values?.shipping_days) || 0,
                shipping_charge: Number(values?.shipping_charge) || 0,
                cash_on_delivery: values?.cash_on_delivery === true ? true : false,
                vat: {
                    vat_type: values?.vat?.vat_type,
                    amount: Number(values?.vat?.amount) || 0,
                },
                tax: {
                    tax_type: values?.tax?.tax_type,
                    amount: Number(values?.tax?.amount) || 0,
                },
                _id: productId,
            }
        };
        console.log(payload)
        await useAction(productId ? updateProduct : createProduct, payload, () => {
            router.push("/vendor/inventory");
        });
        setLoading(false);
    };
    return (

        <Form form={form} layout="vertical" onFinish={handleFinish} className="w-full collapse-title">
            {edit && <HiddenInput name="_id" />}
            <Collapse
                defaultActiveKey={["1"]}
                expandIconPosition="end"
                className="mb-4 "
                items={[
                    {
                        key: "1",
                        label: (
                            <div className="flex items-center ">
                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                                    <span className="text-orange-500">📝</span>
                                </div>
                                <span>Basic Information</span>
                            </div>
                        ),
                        children: (
                            <>
                                {edit && (
                                    <HiddenInput name={"_id"} />)}
                                {languages?.map((l, index) => (
                                    <div key={index} style={{ display: l.code === selectedLang ? "block" : "none" }}>
                                        <FormInput name={["name", l.code]} label="Name" required={true} />
                                        <FormInput name={["short_description", l.code]} label="Short Description" required={true} />
                                        <TextEditor name={["description", l.code]} label="Description" required={true} />
                                    </div>
                                ))}
                            </>
                        ),
                    },
                ]}
            />
            <Collapse
                defaultActiveKey={["1"]}
                expandIconPosition="end"
                className="mb-4"
                items={[
                    {
                        key: "1",
                        label: (
                            <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                                    <span className="text-orange-500">💰</span>
                                </div>
                                <span>Pricing</span>
                            </div>
                        ),
                        children: (
                            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                                <FormInput
                                    placeholder={"Enter Original Price"}
                                    name={"price"}
                                    label={"Enter Original Price"}
                                    type={"number"}
                                    required
                                    onChange={calculateFinalPrice}
                                />
                                <FormInput
                                    placeholder={"discount"}
                                    name={"discount"}
                                    label={"discount"}
                                    type={"number"}
                                    required
                                    onChange={calculateFinalPrice}
                                />
                                <FormSelect
                                    name={"discount_type"}
                                    label={"Discount Type"}
                                    options={[
                                        { name: "Percentage", value: "percentage" },
                                        { name: "Flat", value: "flat" },
                                    ]}
                                    required
                                    onChange={calculateFinalPrice}
                                />
                                <FormInput
                                    readOnly={true}
                                    placeholder={"Enter Final Price"}
                                    name={"final_price"}
                                    label={"Final Price"}
                                    type={"number"}
                                    required
                                />
                                <FormInput
                                    placeholder={"Enter your VAT amount"}
                                    name={["vat", "amount"]}
                                    label={"VAT"}
                                    type={"number"}
                                    required
                                    onChange={calculateFinalPrice}
                                />
                                <FormSelect
                                    placeholder={"Enter your VAT type"}
                                    name={["vat", "vat_type"]}
                                    label={"VAT Type"}
                                    options={[
                                        { name: "Percentage", value: "percentage" },
                                        { name: "Flat", value: "flat" },
                                    ]}
                                    onChange={calculateFinalPrice}
                                />
                                <FormInput
                                    placeholder={"Enter your tax amount"}
                                    name={["tax", "amount"]}
                                    label={"Tax"}
                                    type={"number"}
                                    onChange={calculateFinalPrice}
                                />
                                <FormSelect
                                    placeholder={"Enter your tax type"}
                                    name={["tax", "tax_type"]}
                                    label={"Tax Type"}
                                    options={[
                                        { name: "Percentage", value: "percentage" },
                                        { name: "Flat", value: "flat" },
                                    ]}
                                    required
                                    onChange={calculateFinalPrice}
                                />
                            </div>
                        ),
                    },
                ]}
            />
            <Collapse
                defaultActiveKey={["1"]}
                expandIconPosition="end"
                className="mb-4"
                items={[
                    {
                        key: "1",
                        label: (
                            <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                                    <span className="text-orange-500">🏷️</span>
                                </div>
                                <span>Product Details</span>
                            </div>
                        ),
                        children: (
                            <>
                                <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                                    <FormInput placeholder={"Enter SKU"} name={"sku"} label={"SKU"} required />
                                    <FormInput placeholder={"code"} name={"code"} label={"code"} required />
                                    <FormInput placeholder={"Enter Quantity"} name={"quantity"} label={"Quantity"} type={"number"} required />
                                </div>
                                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
                                    <FormSelect
                                        label={"Category"}
                                        name={"category"}
                                        placeholder="Select Category"
                                        options={category?.docs?.map((c) => ({
                                            value: c?._id,
                                            label: (c?.name[langCode]),
                                        }))}
                                        required
                                    />
                                    <FormSelect
                                        label={"Section"}
                                        name={"section"}
                                        multi={true}
                                        placeholder="Select section"
                                        options={section?.docs?.map((c) => ({
                                            value: c?._id,
                                            label: (c?.name[langCode]),
                                        }))}
                                        required
                                    />
                                   

                                    <FormSelect
                                        label={"brand"}
                                        name={"brand"}
                                        placeholder="Select brand"
                                        options={brand?.docs?.map((c) => ({
                                            value: c?._id,
                                            label: (c?.name[langCode]),
                                        }))}
                                        required
                                    />

                                </div>
                            </>
                        ),
                    },
                ]}
            />
              <Collapse
                defaultActiveKey={["1"]}
                expandIconPosition="end"
                className="mb-4"
                items={[
                    {
                        key: "1",
                        label: (
                            <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                                    <span className="text-orange-500">⚙️</span>
                                </div>
                                <span>Attributes</span>
                            </div>
                        ),
                        children: (
                            <>
                                <div>
                                    <Form.List name="attributes" initialValue={[{ name: "", values: [] }]}>
                                        {(fields, { add, remove }) => (
                                            <>
                                                <div className="flex justify-end">
                                                    <button
                                                        className="bg-[#0d766d] text-white flex items-center gap-2 px-3 py-1 mb-4 rounded-md"
                                                        type="button"
                                                        onClick={() => add()}
                                                    >
                                                        <PlusOutlined /> Add Attribute
                                                    </button>
                                                </div>
                                                <div className="">
                                                    {fields.map(({ key, name, fieldKey, ...restField }) => {
                                                        // Get the selected attribute id for this row
                                                        const selectedAttrId = form.getFieldValue(["attributes", name, "name"]);
                                                        // Get possible values for this attribute id
                                                        const possibleValues = getAttributeValues(selectedAttrId);

                                                        return (
                                                            <div key={key} className="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-4">
                                                                {/* Attribute Name Select */}
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[name, "name"]}
                                                                    fieldKey={[fieldKey, "name"]}
                                                                    rules={[{ required: true, message: "Please select an attribute" }]}
                                                                >
                                                                    <Select
                                                                        placeholder="Select attribute"
                                                                        className="w-full"
                                                                        options={attribute?.docs?.map((attr) => ({
                                                                            value: attr?._id,
                                                                            label: attr?.name[langCode],
                                                                        }))}
                                                                        // Only update name, don't reset values
                                                                        onChange={(value) => {
                                                                            const currentAttributes = form.getFieldValue("attributes");
                                                                            const updatedAttributes = currentAttributes.map((item, idx) =>
                                                                                idx === name
                                                                                    ? { ...item, name: value }
                                                                                    : item
                                                                            );
                                                                            form.setFieldsValue({ attributes: updatedAttributes });
                                                                            setAttributesState(
                                                                                updatedAttributes.map(attr => ({
                                                                                    name: attribute?.docs?.find(a => a._id === attr.name)?.name || {},
                                                                                    values: attr.values || [],
                                                                                }))
                                                                            );
                                                                        }}
                                                                    />
                                                                </Form.Item>

                                                                {/* Attribute Values Select */}
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[name, "values"]}
                                                                    fieldKey={[fieldKey, "values"]}
                                                                    rules={[{ required: true, message: "Please select values" }]}
                                                                >
                                                                    <Select
                                                                        mode="multiple"
                                                                        placeholder="Select values"
                                                                        className="w-full"
                                                                        options={possibleValues.map((val) => ({
                                                                            value: val,
                                                                            label: val,
                                                                        }))}
                                                                        onChange={(selectedValues) => {
                                                                            const currentAttributes = form.getFieldValue("attributes");
                                                                            const updatedAttributes = currentAttributes.map((item, idx) =>
                                                                                idx === name
                                                                                    ? { ...item, values: selectedValues }
                                                                                    : item
                                                                            );
                                                                            form.setFieldsValue({ attributes: updatedAttributes });
                                                                            setAttributesState(
                                                                                updatedAttributes.map(attr => ({
                                                                                    name: attribute?.docs?.find(a => a._id === attr.name)?.name || {},
                                                                                    values: attr.values || [],
                                                                                }))
                                                                            );
                                                                        }}
                                                                    />
                                                                </Form.Item>

                                                                {/* Remove Attribute Button */}
                                                                <MinusOutlined
                                                                    onClick={() => {
                                                                        const updatedAttributes = form.getFieldValue("attributes").filter(
                                                                            (_, idx) => idx !== name
                                                                        );
                                                                        form.setFieldsValue({ attributes: updatedAttributes });
                                                                        setAttributesState(
                                                                            updatedAttributes.map(attr => ({
                                                                                name: attribute?.docs?.find(a => a._id === attr.name)?.name || {},
                                                                                values: attr.values || [],
                                                                            }))
                                                                        );
                                                                        remove(name);
                                                                    }}
                                                                    className="text-red-500 cursor-pointer w-fit h-fit"
                                                                />
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                                {/* )} */}
                            </>
                        ),
                    },
                ]}
            />
            <Collapse
                defaultActiveKey={["1"]}
                expandIconPosition="end"
                className="mb-4"
                items={[
                    {
                        key: "1",
                        label: (
                            <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                                    <span className="text-orange-500">⚙️</span>
                                </div>
                                <span>Settings</span>
                            </div>
                        ),
                        children: (
                            <>
                                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                                    <Form.Item label="Cash on Delivery" name="cash_on_delivery" valuePropName="checked">
                                        <Switch />
                                    </Form.Item>
                                    <Form.Item label="Stock" name="stock" valuePropName="checked">
                                        <Switch />
                                    </Form.Item>
                                    <Form.Item label="Show Stock" name="show_stock" valuePropName="checked">
                                        <Switch />
                                    </Form.Item>
                                    <Form.Item label="Status" name="status" valuePropName="checked">
                                        <Switch />
                                    </Form.Item>
                                </div>
                                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                                    <Form.Item valuePropName="checked">
                                        <Checkbox
                                            checked={isFreeShipping}
                                            onChange={(e) => {
                                                const checked = e.target.checked
                                                setIsFreeShipping(checked)
                                                if (checked) {
                                                    form.setFieldsValue({ shipping_charge: 0 })
                                                } else {
                                                    form.setFieldsValue({ shipping_charge: undefined })
                                                }
                                            }}
                                        >
                                            Free Shipping
                                        </Checkbox>
                                    </Form.Item>
                                    {!isFreeShipping && (
                                        <FormInput
                                            placeholder={"Enter Shipping Charge"}
                                            name={"shipping_charge"}
                                            label={"Shipping Charge"}
                                            type={"number"}
                                            required
                                        />
                                    )}
                                    <FormInput placeholder={"shipping days"} name={"shipping_days"} label={"Shipping Days"} type={"number"} required />
                                </div>
                            </>
                        ),
                    },
                ]}
            />
            <Collapse
                defaultActiveKey={["1"]}
                expandIconPosition="end"
                className="mb-4"
                items={[
                    {
                        key: "1",
                        label: (
                            <div className="flex items-center ">
                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                                    <span className="text-orange-500">📷</span>
                                </div>
                                <span>Images</span>
                            </div>
                        ),
                        children: (
                            <div className="flex gap-4 my-4">
                                <MultipleImageInput name={"thumbnail"} label={i18n?.t("Thumbnail Image")} />
                                <MultipleImageInput name={"images"} label={i18n?.t("Product Images")} max={4} />
                            </div>
                        ),
                    },
                ]}
            />
             <div className="flex justify-end">
             <SubmitButton onClick={() => noSelected({ form, setSelectedLang })} type="submit" className="mt-2.5">
                {i18n?.t("Submit")}
            </SubmitButton>
           </div>
        </Form>
    )
}


export default ProductForm