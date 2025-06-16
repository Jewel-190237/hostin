"use client"
import { fetchEmailSettings } from '@/app/helpers/backend';
import { useFetch } from '@/app/helpers/hooks';
import { Tabs, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import SendGridManageEmail from './send-grid';
import GmailEmailProvider from './gmail';
import TitleBar from '@/app/components/admin/common/title-bar';

const EmailSettings = () => {
    // const [form] = Form.useForm();
    const [settings, getSettings, { loading }] = useFetch(fetchEmailSettings)
    console.log("🚀 ~ EmailSettings ~ settings:", settings)
    const [checkedValue, setCheckedValue] = useState(false);

    // useEffect(() => {
    //     if (settings?._id) {
    //         form.resetFields();
    //     }
    // }, [settings]);

    // Define the tab items
    const tabItems = [
        {
            key: "1",
            label: "SendGrid SMTP",
            children: (
                <SendGridManageEmail
                    settings={settings}
                    getSettings={getSettings}
                    loading={loading}
                    checkedValue={checkedValue}
                    setCheckedValue={setCheckedValue}
                />
            ),
        },
        {
            key: "2",
            label: "Gmail Provider",
            children: (
                <GmailEmailProvider
                    settings={settings}
                    getSettings={getSettings}
                    loading={loading}
                    checkedValue={checkedValue}
                    setCheckedValue={setCheckedValue}
                />
            ),
        },
    ];

    return (
        <div>
            <TitleBar title={"Email Settings"} />
            <div className="bg-white p-4 rounded">
                <Tabs defaultActiveKey="1" centered type="card" items={tabItems} />
            </div>
        </div>
    );
};

export default EmailSettings;
