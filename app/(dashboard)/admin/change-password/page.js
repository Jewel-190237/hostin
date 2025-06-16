'use client';
import Button from '@/app/components/admin/common/button';
import { updatePassword } from '@/app/helpers/backend';
import { useAction } from '@/app/helpers/hooks';
import { Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';


const AdminChangePassword = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    return (
        <div className='md:w-3/5 w-full mx-auto rounded bg-white sm:p-10 p-6'>
            <h1 className='text-2xl font-bold md:text-xl '>{('Change Password')}</h1>
            <hr className='border-Font2_Color w-full mt-5' />
            <div className='mx-auto bg-white py-8'>
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={async (values) => {
                        await useAction(updatePassword,{
                            old_password: values.old_password,
                            new_password: values.new_password,
                            confirm_password: values.confirm_password
                        },()=>{
                            form.resetFields();
                            localStorage.removeItem('token')
                            router.push('/')
                        })
                    }}
                >
                    <div className='flex flex-col'>
                        <Form.Item
                            name='old_password'
                            label={('Old Password')}
                            rules={[
                                {
                                    required: true,
                                    message: ('Please input your old password!'),
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder={('Enter Your Old Password')}
                                className='focus:text-dark_text h-10 w-full rounded-md border pl-2'
                            />
                        </Form.Item>
                        <Form.Item
                            name='new_password'
                            label={('New Password')}
                            rules={[
                                {
                                    required: true,
                                    message: ('Please input your password!'),
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                placeholder={('Enter Your New Password')}
                                className='focus:text-dark_text h-10 w-full rounded-md border pl-2'
                            />
                        </Form.Item>
                        <Form.Item
                            name='confirm_password'
                            label={('Confirm Password')}
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: ('Please confirm your password!'),
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('new_password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                ('The new password that you entered do not match!')
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder={('Confirm Your Password')}
                                className='focus:text-dark_text h-10 w-full rounded-md border pl-2'
                            />
                        </Form.Item>
                        <Button children={"Change Password"}/>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AdminChangePassword;
