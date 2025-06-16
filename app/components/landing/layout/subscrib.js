import React from 'react'
import { createSubscribe } from "@/app/helpers/backend"
import { useAction } from "@/app/helpers/hooks"
import { Form, Input } from "antd"
const Subscrib = () => {
     const [form] = Form.useForm()
  return (
    <div>
             <Form form={form} onFinish={
                    (values) => {
                      useAction(createSubscribe, { body: values })
                      form.resetFields()
                    }
                  } className="flex flex-col sm:flex-row gap-4 justify-center font-roboto">
        
                    <div className="flex ">
                      <Form.Item name="email" className="w-full">
                        <Input
                          type="email"
                          placeholder="Email address"
                          className="px-4 py-3 rounded-md focus:outline-none w-full md:w-auto lg:w-[370px]"
                        />
                      </Form.Item>
                    </div>
                    <button className="bg-black font-roboto text-white px-4 py-3 h-fit rounded-md hover:bg-gray-900 transition-colors ">
                      Subscribe Now
                    </button>
                  </Form>
    </div>
  )
}

export default Subscrib