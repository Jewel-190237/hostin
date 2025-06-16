/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Button from "@/app/components/admin/common/button";
import TitleBar from "@/app/components/admin/common/title-bar";
import FormInput, { HiddenInput } from "@/app/components/form/form-input";
import { fetchAdminLanguages, putLanguage } from "@/app/helpers/backend";
import { useAction, useFetch } from "@/app/helpers/hooks";
import { Form } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Translations = () => {
  const params = useParams();
  const { push } = useRouter();
  const id = params?._id;
  const [translations, getTranslations] = useFetch(fetchAdminLanguages, {}, false);
  const [data, getData] = useFetch(fetchAdminLanguages, {}, false);
  const [refresh, setRefresh] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      getData({ _id: id });
      getTranslations({ _id: id });
    }
  }, [id, refresh]);

  useEffect(() => {
    if (translations) {
      let values = {};
      Object?.keys(translations?.translations ?? {})?.forEach((key) => {
        values = {
          ...values,
          [id]: {
            ...values[id],
            [key]: {
              value: translations?.translations[key],
            },
          },
        };
      });
      form.setFieldsValue(values);
    }
  }, [translations]);

  const keys = [
    
    { name: "Settings" },
    { name: "about" },

  ];

  const handleSubmit = async (values) => {
    let translationsArray = [];
    Object.keys(values)?.forEach((lang) => {
      Object.keys(values[lang])?.forEach((key) => {
        translationsArray.push({
          [key]: values[lang][key].value,
        });
      });
    });

    const translationsObject = {
      translations: Object.assign({}, ...translationsArray),
    };

    const response = await useAction(
      putLanguage,
      {
        body: {
          _id: id,
          name: data?.name,
          code: data?.code,
          flag: data?.flag,
          ...translationsObject,
        },
      },
      () => {
        getTranslations({ _id: id });
        setRefresh((prev) => !prev);
        push("/admin/languages"); // Redirect to /admin/languages after submission
      }
    );
  };

  return (
    <>
      <div className="w-full ">
        <TitleBar title={"Language Translations"} />
          <div className="px-8 py-8 bg-white">
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <table className="px-2 w-full">
                <thead className="bg-gray-100 w-1/2">
                  <tr>
                    <th className="py-2 px-6 text-start">English</th>
                    <th className="py-2 px-6 text-start">{data?.name}</th>
                  </tr>
                </thead>
                <tbody className="mt-2  w-1/2">
                  {keys?.map((key, index) => (
                    <tr key={index} className="">
                      <td className="px-3 py-3 mt-3 bg-transparent dashinput flex justify-start rounded">
                        {key?.name}
                      </td>

                      {id && (
                        <td key={index} className="pl-4 mt-2">
                          <HiddenInput
                            name={[id, key.name, "type"]}
                            initialValue={key.type}
                            className=" "
                          />
                          <FormInput
                            className="w-full rounded bg-transparent p-3 mt-3 dashinput"
                            initialValue=""
                            name={[id, key.name, "value"]}
                            placeholder="Type here"
                          ></FormInput>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button type="submit"> Submit </Button>
            </Form>
          </div>
        </div>
      
    </>
  );
};

export default Translations;
