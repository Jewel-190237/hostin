'use client'
import React, { useEffect, useState } from 'react'
import { deleteContact, fetchContact, replyContact } from '@/app/helpers/backend';
import { useAction, useFetch } from '@/app/helpers/hooks';
import Table from '@/app/components/common/table';
import { Form, Input, Modal, Tooltip } from 'antd';
import dayjs from 'dayjs';
import TitleBar from '@/app/components/admin/common/title-bar';
import { MdOutlineReplyAll } from 'react-icons/md';
import SubmitButton from '@/app/components/admin/common/submit-button';

const Page = () => {
    const [data, getData, { loading }] = useFetch(fetchContact);
    const [open, setOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    console.log("🚀 ~ Page ~ selectedContact:", selectedContact)
    const [form] = Form.useForm();

    useEffect(() => {
    if (selectedContact) {
      form.setFieldsValue({
        email: selectedContact.email,
        subject: selectedContact.subject,
        replyMessage: "",
      });
    }
  }, [selectedContact, form]);
     const columns = [
    {
      text: "Name",
      dataField: "name",
    },
    {
      text: "Email",
      dataField: "email",
    },
    {
      text: "Subject",
      dataField: "subject",
      formatter: (subject) => {
        const formattedTitle = subject || ""; // Ensure it's accessible
        const shouldTruncate = formattedTitle.length > 20;

        return (
          <Tooltip title ={shouldTruncate ? formattedTitle : ""}>
            <span className="cursor-help">
              {shouldTruncate
                ? formattedTitle.slice(0, 20) + "..."
                : formattedTitle}
            </span>
          </Tooltip>
        );
      },
    },
    {
      text: "Message",
      dataField: "message",
      formatter: (value) => {
        const formattedValue = value || ""; // Ensure it's accessible
        const shouldTruncate = formattedValue.length > 30;

        return (
          <Tooltip title={shouldTruncate ? formattedValue : ""}>
            <span className="cursor-help">
              {shouldTruncate
                ? formattedValue.slice(0, 30) + "..."
                : formattedValue}
            </span>
          </Tooltip>
        );
      },
    },
    {
      text: "Contact At",
      dataField: "createdAt",
      formatter: (_, d) => (
        <span>{dayjs(d?.createdAt).format("DD MMM, YYYY")}</span>
      ),
    },
    {
      text: "Reply",
      dataField: "reply",
      formatter: (_, d) => (
        <button
          onClick={() => {
            setSelectedContact(d);
            setOpen(true);
          }}
        >
         <MdOutlineReplyAll className='text-2xl text-primary' />

        </button>
      ),
    },
  ];
  return (
    <div>
        <TitleBar title={"Contact Us"} />
      <Table
        columns={columns}
        data={data}
        onDelete={deleteContact}
        onReload={getData}
        loading={loading}
        pagination
      />


<Modal
  title={`Reply to ${selectedContact?.email}`}
  open={open}
  onCancel={() => {
    setOpen(false);
    setSelectedContact(null);
    form.resetFields();
  }}
  footer={null}
>
  <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        const payload = {
            body: {
                ...values,
                _id: selectedContact?._id,
                replyMessage: values.replyMessage,
                email: selectedContact?.email,
                subject: selectedContact?.subject,
            }
        };
        useAction(
          replyContact,
          payload,
          () => {
            setOpen(false);
            setSelectedContact(null);
            form.resetFields();
          }
        );
      }}
    >
      <Form.Item name="email" label="Email">
        <Input className='py-2' disabled />
      </Form.Item>
      <Form.Item name="subject" label="Subject">
        <Input className='py-2' disabled />
      </Form.Item>
    <Form.Item
      name="message"
      label="Reply Message"
      rules={[{ required: true, message: "Please enter your reply" }]}
    >
      <Input.TextArea  className='py-2' placeholder="Type your reply here..." />
    </Form.Item>
    <Form.Item>
       <SubmitButton type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Send Reply
      </SubmitButton>
    </Form.Item>
  </Form>
</Modal>
    </div>
  )
}

export default Page