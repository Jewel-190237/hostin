'use client'
import React from "react"
import { Form, DatePicker } from "antd"

const FormDatePicker = ({ name, label, initialValue, onChange, placeholder, extra, disabled = false, tooltip = '', required = false, showTime = false,className }) => {

    return (
        <Form.Item
            name={name}
            label={label}
            initialValue={initialValue || ''}
            placeholder={placeholder}
            extra={extra && extra}
            rules={[
                {
                    required: required,
                    message: 'Please input your ' + label + '!',
                },
            ]}
        >
            <DatePicker title={disabled && tooltip} disabled={disabled} showTime={showTime} onOk={onChange} className={className} />
        </Form.Item>
    )
}
export default FormDatePicker




