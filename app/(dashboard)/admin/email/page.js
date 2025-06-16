"use client";

import React, { useState } from "react";
import TitleBar from "@/app/components/admin/common/title-bar";
import GmailEmailProvider from "@/app/components/admin/gmail";
import SendGridManageEmail from "@/app/components/admin/sendGridManageEmail";
import { fetchEmailSettings } from "@/app/helpers/backend";
import { useFetch } from "@/app/helpers/hooks";
import { Tabs, Form } from "antd";

const EmailSettings = () => {

  const [settings, getSettings, { loading }] = useFetch(fetchEmailSettings);
  
  const [checkedValue, setCheckedValue] = useState(false);


  const tabItems = [
    {
      label: "SendGrid SMTP",
      key: "1",
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
      label: "Gmail Provider",
      key: "2",
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
    <>
  
        <div className="w-full ">
        <TitleBar title={"Email Settings"} />
            </div>
            <div className="p-4 rounded emailTab bg-white tabstyle">
              <Tabs defaultActiveKey="1" centered type="card" items={tabItems} />
            </div>
          
    </>
  );
};

export default EmailSettings;
