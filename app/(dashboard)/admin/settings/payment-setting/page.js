"use client";
import React, { useEffect } from "react";
import { App, ConfigProvider, Tabs } from "antd";
import StripePaymentMethod from "@/app/components/common/payment/stripe";
import PaypalPaymentMethod from "@/app/components/common/payment/paypal";
import RazorpayPaymentMethod from "@/app/components/common/payment/razorpay";
import { fetchSettings } from "@/app/helpers/backend";
import { useFetch } from "@/app/helpers/hooks";
import TitleBar from "@/app/components/admin/common/title-bar";


const PaymentSettings = () => {
//   const [form] = Form.useForm();
  const [paymentsettings, getPaymentSettings] = useFetch(fetchSettings);

//   useEffect(() => {
//     if (paymentsettings) {
//       form.setFieldsValue({
//         ...paymentsettings,
//       });
//     }
//   }, [paymentsettings]);

  const tabItems = [
    {
      label: "Stripe",
      key: "1",
      children: (
        <StripePaymentMethod
          settings={paymentsettings}
          getSettings={getPaymentSettings}
        />
      ),
    },
    {
      label: "PayPal",
      key: "2",
      children: (
        <PaypalPaymentMethod
          settings={paymentsettings}
          getSettings={getPaymentSettings}
        />
      ),
    },
    {
        label: "Razorpay",
        key: "3",
        children: (
          <RazorpayPaymentMethod
            settings={paymentsettings}
            getSettings={getPaymentSettings}
          />
        ),
      },
  ];

  return (
    <App> {/* ✅ Wrap the entire content in App */}
    <div className="w-full">
      <TitleBar title={"Payment Settings"} />
      <div className="p-4 rounded bg-white">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                itemActiveColor: "#000",
                itemSelectedColor: "#6366f1",
                itemHoverColor: "#6366f1",
              },
            },
          }}
        >
          <Tabs
            type="card"
            defaultActiveKey="1"
            centered
            tabBarStyle={{ color: "#000", fontWeight: "bold" }}
            items={tabItems}
          />
        </ConfigProvider>
      </div>
    </div>
  </App>
  );
};

export default PaymentSettings;

