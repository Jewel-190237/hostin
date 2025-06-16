"use client"
import { Form } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "./ProductForm";
import { useI18n } from "@/app/context/i18n";
import TitleBar from "@/app/components/admin/common/title-bar";
import { useFetch } from "@/app/helpers/hooks";
import { fetchAttribute, fetchBrand, fetchCategory, fetchsection } from "@/app/helpers/backend";
const page = () => {
    const [form] = Form.useForm();
    const router = useRouter()
    const i18n = useI18n()
    let { languages, langCode } = useI18n();
    const [data, getData] = useFetch(fetchCategory);
    const [attribute, getAttribute] = useFetch(fetchAttribute,{status:true});
    console.log("🚀 ~ page ~ attribute:", attribute)
    const [brand, getBrand] = useFetch(fetchBrand,{status:true});
    console.log("🚀 ~ page ~ brand:", brand)
    const [section, getSection] = useFetch(fetchsection,{status:true});
    console.log("🚀 ~ page ~ section:", section)
    const [selectedLang, setSelectedLang] = useState();
    const [formData, setFromData] = useState([])

    useEffect(() => {
        setSelectedLang(langCode)
    }, [langCode])

    return (
        <div className="px-4 flex flex-col gap-4">
               <TitleBar title={"Add Product"} />
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
            <ProductForm category={data} attribute={attribute} brand={brand} section={section} getSection={getSection} getAttribute={getAttribute} data={data} languages={languages} langCode={langCode} selectedLang={selectedLang} setSelectedLang={setSelectedLang} form={form} formData={formData} setFromData={setFromData} i18n={i18n} router={router} />
        </div>
    );
};

export default page;