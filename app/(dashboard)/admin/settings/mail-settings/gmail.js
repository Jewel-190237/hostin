import React, { useState, useEffect } from 'react';
import { Form, Input, message, Switch } from 'antd';
import { useAction } from '@/app/helpers/hooks';
import { Loader } from '@/app/components/common/loader';
import FormInput, { HiddenInput } from '@/app/components/form/form-input';
import Button from '@/app/components/admin/common/button';
import { postEmailSettings } from '@/app/helpers/backend';
import FormSelect from '@/app/components/form/select';

const GmailEmailProvider = ({ settings, getSettings, loading, setCheckedValue }) => {
    const [form] = Form.useForm();
    const [defaultEmail, setDefaultEmail] = useState('');

    useEffect(() => {
        if (settings?._id) {
            form.resetFields();
            form.setFieldsValue({
                ...settings.email_config,
                gmail: {
                    auth_email: settings.email_config?.gmail?.auth_email,
                    password: settings.email_config?.gmail?.password,
                    service_provider: settings.email_config?.gmail?.service_provider
                }
            });
    
            if (settings.email_config?.default === 'gmail') {
                setDefaultEmail('gmail');
                form.setFieldsValue({ default: 'gmail' });
                setCheckedValue(true);
            } else {
                setDefaultEmail('');
                form.setFieldsValue({ default: '' });
                setCheckedValue(false);
            }
        }
    }, [settings]);


    const onFinish = async (values) => {
        const postData = {
            body: {
                email_config: {
                    sendgrid: {
                        host: settings.email_config?.sendgrid?.host,
                        port: settings.email_config?.sendgrid?.port,
                        username: settings.email_config?.sendgrid?.username,
                        password: settings.email_config?.sendgrid?.password,
                        sender_email: settings.email_config?.sendgrid?.sender_email
                    },
                    default: values?.default,
                    gmail: {
                        auth_email: values?.gmail?.auth_email,
                        password: values?.gmail?.password,
                        service_provider: values?.gmail?.service_provider
                    }
                }
            }
        };
        return useAction(postEmailSettings, postData, () => {
            getSettings();
        });
    };

    if (loading) {
        return <div className='flex justify-center items-center h-[300px]'>
            <Loader />
        </div>
    }

    return (
        <div className='pt-0'>

            <Form
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >
                <div className='p-3 space-y-3'>
                    <p className="text-[16px] mb-6 border-b-[1px] border-b-[#21ec5e]">
                        {("Gmail SMTP")}
                    </p>
                    <div className='hidden'>
                        <HiddenInput name="_id" />
                    </div>

                    <FormInput label={("Email Username")} name={['gmail', 'auth_email']} placeholder={("Please input email username")} required={true} type='text' />
                    <FormInput label={("Email Password")} name={['gmail', 'password']} placeholder={("Please input email password")} required={true} type='password'  />
                    <FormSelect label={("Service Provider")} name={['gmail', 'service_provider']} options={[{ label: 'Gmail', value: 'gmail' }, { label: 'Other', value: 'other' }]} />
                    <FormSelect label={("Set Default")} name='default' options={[{ label: 'Inactive', value: 'sendgrid' }, { label: 'Active', value: 'gmail' }]} />
                    <div className='relative mt-2'>
                        <Button children={("Submit")}></Button>
                    </div>
                </div>
            </Form>

        </div>
    );
};


export default GmailEmailProvider;