"use client"
import React from "react";
import { useEffect, useState } from "react";
import { Form } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useI18n } from "@/app/context/i18n";
import { useFetch } from "@/app/helpers/hooks";
import { fetchAttribute, fetchBrand, fetchCategory, fetchsection, singleProductAdmin } from "@/app/helpers/backend";
import ProductForm from "../../add/ProductForm";
import TitleBar from "@/app/components/admin/common/title-bar";

const page = ({ params }) => {
    const unwrappedParams = React.use(params);
    const [form] = Form.useForm();
    const router = useRouter();
    const i18n = useI18n();
    let { languages, langCode } = useI18n();
    const [data, getData] = useFetch(singleProductAdmin);
    console.log("🚀 ~ page ~ data:", data)
    const [edit, setEdit] = useState(false);
    const [category, getCategory] = useFetch(fetchCategory);
    const [attribute, getAttribute] = useFetch(fetchAttribute);
    const [brand, getBrand] = useFetch(fetchBrand);
    const [section, getSection] = useFetch(fetchsection);
    const [selectedLang, setSelectedLang] = useState();
    const [formData, setFromData] = useState([]);

    useEffect(() => {
        setSelectedLang(langCode);
    }, [langCode]);

    useEffect(() => {
        getData({ _id: unwrappedParams?._id });
    }, []);
    const getAttributeIdByName = (name, attributeDocs, langCode) => {

        if (attributeDocs?.some(attr => attr._id === name)) return name;

        const found = attributeDocs?.find(attr =>
            attr.name?.[langCode] === name || attr.name?.en === name
        );
        return found?._id || "";
    };
    useEffect(() => {
        form.setFieldsValue({
            name: data?.name,
            code: data?.code,
            sku: data?.sku,
            short_description: data?.short_description,
            description: data?.description, 
            thumbnail: data?.thumbnail?.length > 0
                ? [
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: data?.thumbnail,
                    },
                ]
                : [],
            images: data?.images?.map((img, index) => ({
                uid: `-${index + 1}`,
                name: img,
                status: 'done',
                url: img,
            })),
            category: data?.category?._id,
            brand: data?.brand?._id,
            section: data?.section?.map((sec) => sec._id),
            attribute: data?.attribute?.map((att) => att._id),
            attribute_value: data?.attribute?.map((att) => ({
                _id: att._id,
                value: att.value,
            })),
            price: Number(data?.price) || 0,
            discount_type: data?.discount_type || "flat",
            discount: Number(data?.discount) || 0,
            discount: Number(data?.discount) || 0,
            shipping_days: data?.shipping_days,
            final_price: Number(data?.final_price) || 0,
            quantity: Number(data?.quantity) || 0,
            stock: data?.stock ,
            show_stock: data?.show_stock,
            status: data?.status,
            free_shipping: data?.free_shipping || false,
            shipping_charge: Number(data?.shipping_charge),
            cash_on_delivery: data?.cash_on_delivery,
            free_shipping: data?.free_shipping,
             vat: {
                amount: data?.vat?.amount,
                vat_type: data?.vat?.vat_type,
            },
            tax: {
                amount: data?.tax?.amount,
                tax_type: data?.tax?.tax_type,
            },
            attributes: data?.attributes?.map((attr) => {
                // Try to resolve attribute id from name if needed
                const attrId = getAttributeIdByName(attr.name?.[langCode] || attr.name?.en || attr.name, attribute?.docs, langCode);
                return {
                    id: attr?._id,
                    name: attrId,
                    values: attr?.values || [],
                };
            }) || [],
        });
    }, [data, attribute, langCode]);

    return (
        <div className="px-4 flex flex-col gap-4">
            <TitleBar title={"Edit Product"} />
            <div className="flex justify-start flex-wrap gap-3 mt-4">
                {languages?.map((l) => (
                    <button
                        onClick={() => setSelectedLang(l.code)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                            l.code === selectedLang
                                ? "bg-[#0d766d] text-white"
                                : "bg-gray-200 text-[#0d766d] hover:bg-gray-300"
                        }`}
                        key={l.code}
                    >
                        {l.name}
                    </button>
                ))}
            </div>
            <ProductForm
                category={category}
                attribute={attribute}
                brand={brand}
                section={section}
                getSection={getSection}
                getAttribute={getAttribute}
                data={data}
                productId={data?._id} // Pass product _id to ProductForm
                languages={languages}
                langCode={langCode}
                selectedLang={selectedLang}
                setSelectedLang={setSelectedLang}
                form={form}
                formData={formData}
                setFromData={setFromData}
                i18n={i18n}
                router={router}
                edit={edit} // Pass edit state
            />
        </div>
    );
};

export default page;