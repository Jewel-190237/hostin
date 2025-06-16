"use client";
import React, { useEffect, useState } from "react";
import { Form, Switch } from "antd";
import Button from "./common/button";
import FormInput, { HiddenInput } from "../form/form-input";
import { postEmailSettings } from "@/app/helpers/backend";
import { useAction } from "@/app/helpers/hooks";
const SendGridManageEmail = ({
  settings,
  getSettings,
  loading,
  setCheckedValue,
}) => {
  const [form] = Form.useForm();
  const [defaultEmail, setDefaultEmail] = useState("gmail");
  const setting = settings?.email_config;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...setting,
      sendgrid: {
        host: setting?.sendgrid?.host,
        port: setting?.sendgrid?.port,
        username: setting?.sendgrid?.username,
        password: setting?.sendgrid?.password,
        sender_email: setting?.sendgrid?.sender_email,
      },
    });

    if (setting?.default === "sendgrid") {
      setDefaultEmail("sendgrid");
      form.setFieldsValue({ default: "sendgrid" });
      setCheckedValue(true);
    } else {
      setDefaultEmail("gmail");
      form.setFieldsValue({ default: "gmail" });
      setCheckedValue(false);
    }
  }, [setting, form, setCheckedValue]);

  const onFinish = async (values) => {
    const postData = {
      body: {
        email_config: {
          default: defaultEmail,
          sendgrid: {
            host: values?.sendgrid?.host || "",
            port: parseInt(values?.sendgrid?.port) || 0,
            username: values?.sendgrid?.username || "",
            password: values?.sendgrid?.password || "",
            sender_email: values?.sendgrid?.sender_email || "",
          },
          gmail: {
            auth_email: setting?.gmail?.auth_email || "",
            password: setting?.gmail?.password || "",
            service_provider: setting?.gmail?.service_provider || "",
          },
        },
      },
    };

    try {
      await useAction(postEmailSettings, postData, () => {
        getSettings();
      });
    } catch (error) {
      console.error("Error while submitting form:", error);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-[300px]">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <div className="pt-0">
      <Form
       form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <div className="p-3">
          <p className="text-[16px] mb-6 border-b-[1px] text-[#0D766D] border-b-[#0D766D]">
            {("SendGrid SMTP")}
          </p>
          <HiddenInput name="_id" />
          <FormInput
            name={["sendgrid", "host"]}
            label={("Email Host")}
            required
            placeholder={("Please input email host!")}
            className="w-full rounded bg-transparent p-3 dashinput"
          />

          <FormInput
            name={["sendgrid", "port"]}
            label={("Email Port")}
            required
            placeholder={("Please input email port!")}
            className="w-full rounded bg-transparent p-3 dashinput"
          />

          <FormInput
            name={["sendgrid", "username"]}
            label={("Email Username")}
            required
            placeholder={("Please input email username!")}
            className="w-full rounded bg-transparent p-3 dashinput"
          />

          <FormInput
            name={["sendgrid", "password"]}
            label={("Email Password")}
            required
            placeholder={("Please input email password")}
            className="w-full rounded bg-transparent p-3 dashinput"
          />

          <FormInput
            name={["sendgrid", "sender_email"]}
            label={("Sender Email")}
            required
            placeholder={("Please input sender email")}
            className="w-full rounded bg-transparent p-3 dashinput"
          />
          <Form.Item name="default" label={("Set Default")}>
            <Switch
              checked={defaultEmail === "sendgrid"}
              onChange={(checked) => {
                setDefaultEmail(checked ? "sendgrid" : "gmail");
              }}
              className={
                defaultEmail === "sendgrid"
                  ? "bg-primary mt-1"
                  : "bg-gray-500 mt-1"
              }
              checkedChildren={
                <span className="text-white">{("On")}</span>
              }
              unCheckedChildren={
                <span className="text-white">{("Off")}</span>
              }
            />
          </Form.Item>
          <div className="relative">
            <Button type="submit" className="mt-2.5">
              {("Submit")}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SendGridManageEmail;
