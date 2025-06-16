'use client';
import React, { useEffect, useState } from "react";
import { Form, Modal, Switch } from "antd";
import { useRouter } from "next/navigation";
import { PiTranslate } from "react-icons/pi";
import { useI18n } from "@/app/context/i18n";
import { useAction, useActionConfirm, useFetch } from "@/app/helpers/hooks";
import { delLanguage, fetchAdminLanguages, postLanguage, putLanguage } from "@/app/helpers/backend";
import TitleBar from "@/app/components/admin/common/title-bar";
import Table from "@/app/components/common/table";
import Button from "@/app/components/admin/common/button";
import FormInput, { HiddenInput } from "@/app/components/form/form-input";
import FormSelect from "@/app/components/form/select";

const Languages = () => {
  const i18n = useI18n();
  const { push } = useRouter();
  const [languages, getLanguages, { loading }] = useFetch(
    fetchAdminLanguages,
    {},
    false
  );
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getLanguages();
  }, []);

  const columns = [
    { text: "Name", dataField: "name" },
    { text: "Flag", dataField: "flag" },
    { text: "Code", dataField: "code" },
    {
      text: "Default",
      dataField: "default",
      formatter: (_, d) => (
        <Switch
          checkedChildren={"Active"}
          unCheckedChildren={"Inactive"}
          checked={d?.default}
          onChange={async (e) => {
            await useActionConfirm(
              putLanguage,
              {
                body: {
                  _id: d._id,
                  default: e,
                },
              },
              getLanguages,
              "Are you sure you want to change default language?",
              "Yes, Change"
            );
          }}
          className="bg-gray-500"
        />
      ),
    },
    {
      text: "Status",
      dataField: "active",
      formatter: (_, d) => (
        <Switch
          checkedChildren={"Active"}
          unCheckedChildren={"Inactive"}
          checked={d?.active}
          onChange={async (e) => {
            await useActionConfirm(
              putLanguage,
              {
                body: {
                  _id: d._id,
                  active: e,
                },
              },
              getLanguages,
              "Are you sure you want to change status?",
              "Yes, Change"
            );
          }}
          className="bg-gray-500"
        />
      ),
    },
    {
      text: "RTL",
      dataField: "rtl",
      formatter: (_, d) => <span>{d?.rtl ? "Yes" : "No"}</span>,
    },
  ];

  let actions = ({ _id }) => (
    <button
      className="border border-[#0d766d] text-[#0d766d] p-2 rounded"
      title="Edit"
      onClick={() => {
        push("/admin/languages/translations/" + _id);
      }}
    >
      <PiTranslate size={12} />
    </button>
  );

  return (
    <div className="w-full ">
        <TitleBar title={"Languages Settings"} />
          <Table
            columns={columns}
            data={languages}
            title=" "
            onReload={getLanguages}
            loading={loading}
            indexed
            action={
              <Button
                onClick={() => {
                  form.resetFields();
                  setOpen(true);
                  setIsEdit(false);
                }}
              >
                {"Add New"}
              </Button>
            }
            onEdit={(values) => {
              form.setFieldsValue({
                ...values,
              });
              setOpen(true);
              setIsEdit(true);
            }}
            onDelete={delLanguage}
            actions={actions}
          />
    

        <Modal
          className="dashboardModal xl:!w-[700px]"
          open={open}
          onCancel={() => setOpen(false)}
          title={
            <h2 className="text-[#0d766d] heading-3">
              {isEdit ? "Edit Language" : "Add Language"}
            </h2>
          }
          footer={null}
          destroyOnClose
        >


          <Form
            form={form}
            layout="vertical"
            onFinish={async (values) => {
              const requestData = {
                ...values,
              };
              await useAction(
                isEdit ? putLanguage : postLanguage,
                { body: requestData },
                () => {
                  setOpen(false);
                  getLanguages();
                }
              );
            }}
            className="mt-2"
          >
            {isEdit && <HiddenInput name="_id" />}
            <FormInput
              name="name"
              label={"Name"}
              className="w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Name")}
              required
            />
            <FormInput
              name="code"
              label={"Code"}
              required
              className="w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Code")}
            />
            <FormInput
              name="flag"
              label={"Flag"}
              required
              className="w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Flag")}
            />
            <FormSelect
              className="w-full rounded bg-transparent px-3 py-[22px] dashinput"
              placeholder={i18n.t("Select Type")}
              name="rtl"
              label={"Rtl Support"}
              required
              options={[
                { label: i18n?.t("Yes"), value: true },
                { label: i18n?.t("No"), value: false },
              ]}
            />

            <Button type="submit">Submit</Button>
          </Form>
        </Modal>
    </div>
  );
};

export default Languages;
