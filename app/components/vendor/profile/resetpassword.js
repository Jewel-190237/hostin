import React from 'react'
import TitleBar from '../../admin/common/title-bar'
import { Form, message } from 'antd'
import FormInput from '../../form/form-input'
import SubmitButton from '../../admin/common/submit-button'
import {changedPassword} from '@/app/helpers/backend'
import { useRouter } from 'next/navigation'
import { useUser } from '@/app/context/user'

const ResetPassword = () => {
    const route = useRouter();
    const {getUser,setUser} = useUser();
  return (
    <>
    <TitleBar title="Reset Password" />
   
        <Form layout='vertical' className=" bg-white p-4 rounded-lg"
        onFinish={ 
          async (values) => {
           const payload = {
            body : {
              old_password: values.old_password,
              password: values.password,
              confirm_password: values.confirm_password
            }
          }
              const {data,success} = await changedPassword(payload);
              if(success){
                 message.success("Password changed successfully");
                 await getUser();
                 setUser({});
                localStorage.removeItem('token')
                 route.push('/');
              }
                else{
                   message.error("Failed to change password");
                }
            }
          }
        >
          <FormInput label="Old Password" name="old_password" type="password" required />
          <FormInput label="New Password" name="password" type="password" required />
          <FormInput label="Confirm Password" name="confirm_password" type="password" required />
          <SubmitButton type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">Reset Password</SubmitButton>
        </Form>
      
    </>
  )
}

export default ResetPassword
