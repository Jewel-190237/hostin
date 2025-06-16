"use client";
import React, { useEffect, useState } from "react";
import { Form, Spin, App } from "antd"; // Import App component
import { postSettings, uploadSingleFile } from "@/app/helpers/backend";
import MultipleImageInput from "../../form/multiImage";
import FormInput from "../../form/form-input";
import FormSelect from "../../form/select";
import Button from "../../admin/common/button";
import { useAction } from "@/app/helpers/hooks";

const StripePaymentMethod = ({ settings, getSettings }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(" ");
  const [imgLoading, setImgLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (settings?._id) {
      const data = settings?.stripe;

      setImageUrl(data?.logo); 

      form.setFieldsValue({
        ...data,
        logo: data?.logo
          ? [
              {
                uid: "-1",
                name: "logo.png",
                status: "done",
                url: data?.logo, 
              },
            ]
          : [],
      });

    }
  }, [settings?._id, form]);

  const onFinish = async (values) => {
    setSubmitLoading(true);

    let logoUrl = imageUrl;
    if (values?.logo?.[0]?.originFileObj) {
      setImgLoading(true);
      try {
        const { data } = await uploadSingleFile({
          image: values.logo[0].originFileObj,
          image_name: "logo",
        });
        logoUrl = data?.image || "";
        setImageUrl(logoUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setImgLoading(false);
      }
    }

    const payload = {
      stripe: {
        credentials: {
          stripe_publishable_key: values.credentials?.stripe_publishable_key,
          stripe_secret_key: values.credentials?.stripe_secret_key,
          stripe_webhook_secret: values.credentials?.stripe_webhook_secret,
        },
        is_active: values.is_active,
        name: values.name,
        logo: logoUrl,
      },
    };

    await useAction(
      postSettings,
      { body: payload },
      () => {
        getSettings();
        setSubmitLoading(false);
      },
      setSubmitLoading
    );
  };

  return (
    <App> 
      <div className="p-5">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <MultipleImageInput name="logo" label={"Logo"} required />
          {imgLoading && <Spin fullscreen />}
          <FormInput
            initialValue="Stripe"
            readOnly
            name={"name"}
            label="Name"
            placeholder="Name"
            className="w-full rounded bg-transparent p-3 dashinput"
            required
          />
          <FormInput
            name={["credentials", "stripe_publishable_key"]}
            label="Publishable key"
            placeholder="Please Provide Publishable key"
            className="w-full rounded bg-transparent p-3 dashinput"
            required
          />
          <FormInput
            name={["credentials", "stripe_secret_key"]}
            label="Secret Key"
            placeholder="Please Provide Secret Key"
            className="w-full rounded bg-transparent p-3 dashinput"
            required
          />
          <FormInput
            name={["credentials", "stripe_webhook_secret"]}
            label="Stripe Webhook Secret"
            placeholder="Please Stripe Webhook Secret"
            className="w-full rounded bg-transparent p-3 dashinput"
            required
          />
          
          <FormSelect
            name={"is_active"}
            label={"Status"}
            placeholder="Select Payment Status"
            className="w-full rounded bg-transparent px-2 py-[23px] dashinput"
            options={[
              { label: ("Enable"), value: true },
              { label: ("Disable"), value: false },
            ]}
            required
          />
          <Button type="submit" loading={submitLoading} className={"mt-2"}>
            Submit
          </Button>
        </Form>
      </div>
    </App>
  );
};

export default StripePaymentMethod;
