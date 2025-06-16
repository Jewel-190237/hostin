"use client";


import Button from "@/app/components/admin/common/button";
import TitleBar from "@/app/components/admin/common/title-bar";
import FormInput from "@/app/components/form/form-input";
import FormSelect from "@/app/components/form/select";
import { fetchSMSSettings, postsSMSSettings } from "@/app/helpers/backend";
import { useAction, useFetch } from "@/app/helpers/hooks";
import { Form } from "antd";
import React, { useEffect } from "react";

const SMSSettings = () => {
  const [form] = Form.useForm();

  const [settings, getSettings, loading] = useFetch(fetchSMSSettings);
  useEffect(() => {
    if (settings?.phone_config) {
      form.setFieldsValue(settings.phone_config);
    }
  }, [settings, form]);

  return (
    <>
      <div className="">
      <TitleBar title={"SMS Settings"} />
   
          <div className=" p-6 rounded  bg-white">
            <Form
              layout="vertical"
              form={form}
              onFinish={async (values) => {
                const postData = {
                  body: {
                    phone_config: {
                      ...values,
                    },
                  },
                };
                return useAction(postsSMSSettings, postData, () => {
                  getSettings();
                });
              }}
            >
              <FormInput
                name={["twilio_auth_token"]}
                label={("Twilio Auth Token")}
                required
                placeholder={("Please Your Twilio Auth Token")}
                className="w-full rounded bg-transparent p-3 dashinput"
              />
              <FormInput
                name={["twilio_sender_number"]}
                label={("Twilio Sender Number")}
                placeholder={("Your Twilio Sender number")}
                className="w-full rounded bg-transparent p-3 dashinput"
                required
              />
              <FormInput
                name={["twilio_account_sid"]}
                label={("Twilio Account SID")}
                placeholder={("Your Twilio Account SID")}
                className="w-full rounded bg-transparent p-3 dashinput"
                required
              />
              <FormSelect
                name={["is_active"]}
                label={("Status")}
                className="w-full rounded bg-transparent px-2 py-[23px] dashinput"
                placeholder={("Select Status")}
                options={[
                  { label: ("Enable"), value: true },
                  { label: ("Disable"), value: false },
                ]}
                required
              />

              <div className="relative mt-2">
                <Button type="submit" className="mt-2.5">
                  {("Submit")}
                </Button>
              </div>
            </Form>
          </div>
      </div>
    </>
  );
};

export default SMSSettings;
