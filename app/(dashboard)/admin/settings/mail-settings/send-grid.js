import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { useAction } from '@/app/helpers/hooks';
import { postEmailSettings } from '@/app/helpers/backend';
import { Loader } from '@/app/components/common/loader';
import FormInput, { HiddenInput } from '@/app/components/form/form-input';
import Button from '@/app/components/admin/common/button';
import FormSelect from '@/app/components/form/select';

const SendGridManageEmail = ({ settings, getSettings, loading, setCheckedValue }) => {
    const [form] = Form.useForm();
    const [defaultEmail, setDefaultEmail] = useState('');


    useEffect(() => {
        if (settings?._id) {
            form.resetFields();
            form.setFieldsValue({
                sendgrid: {
                    host: settings?.email_config?.sendgrid?.host,
                    port: settings?.email_config?.sendgrid?.port,
                    username: settings?.email_config?.sendgrid?.username,
                    password: settings?.email_config?.sendgrid?.password,
                    sender_email: settings?.email_config?.sendgrid?.sender_email
                },
                gmail: {
                    auth_email: settings?.email_config?.gmail?.auth_email,
                    password: settings?.email_config?.gmail?.password,
                    service_provider: settings?.email_config?.gmail?.service_provider
                }
            });
    
            if (settings?.email_config?.default === 'sendgrid') {
                setDefaultEmail('sendgrid');
                form.setFieldsValue({ default: 'sendgrid' });
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
                        host: values?.sendgrid?.host,
                        port: values?.sendgrid?.port,
                        username: values?.sendgrid?.username,
                        password: values?.sendgrid?.password,
                        sender_email: values?.sendgrid?.sender_email
                    },
                    default: values?.default,
                    gmail: {
                        auth_email: settings?.email_config?.gmail?.auth_email,
                        password: settings?.email_config?.gmail?.password,
                        service_provider: settings?.email_config?.gmail?.service_provider
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
                <div className='p-3'>
                    <p className="text-[16px] mb-6 border-b-[1px] border-b-primary">{('SendGrid SMTP')}</p>
                    <div className='hidden'>
                        <HiddenInput name="_id" />
                    </div>

                    <FormInput label={('Email Host')} name={['sendgrid', 'host']} placeholder={('Please input email host')} rules={[{ required: true, message: ('Please input email host!') }]} />
                    <FormInput label={('Email Port')} name={['sendgrid', 'port']} placeholder={('Please input email port')} rules={[{ required: true, message: ('Please input email port!') }]} />
                    <FormInput label={('Email Username')} name={['sendgrid', 'username']} placeholder={('Please input email username')} rules={[{ required: true, message: ('Please input email username!') }]} />
                    <FormInput label={('Email Password')} name={['sendgrid', 'password']} placeholder={('Please input email password')} rules={[{ required: true, message: ("Please input email password!") }]} type='password' />
                    <FormInput label={('Sender Email')} name={['sendgrid', 'sender_email']} placeholder={('Please input sender email')} rules={[{ required: true, message: ('Please input sender email!') }]} />
                    <FormSelect label={("Set Default")} name='default' options={[{ label: 'Active', value: 'sendgrid' }, { label: 'Inactive', value: 'gmail' }]} />

                    <div className='relative'>
                        <Button type='submit' className="mt-2.5">{('Submit')}</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default SendGridManageEmail;