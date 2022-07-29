/* eslint-disable */
import React from 'react'
import { Button, Form, Input } from 'antd';
import { registerUser } from '../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form] = Form.useForm()
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinish = (values) => {
    let body = {
      email : values.email, 
      name :  values.name,
      password :  values.password,
      password2 : values.password2,
    }
    dispatch(registerUser(body)).then(res => {
      if(!res.payload.success) {
        alert(res.payload.err)
        form.resetFields()
      } 
      if(res.payload.success) {
        alert('로그인 해주시길 바랍니다.')
        navigate('/login')
        form.resetFields()
      }
    })
  }


  return (
    <div className='login-body'>
      <Form
        form={form}
        style={{ minWidth: '375px' }}
        className='form-antd'
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
          
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="password2"
          rules={[{ required: true, message: 'Enter your confirmPassword!' }]}
        >
          <Input.Password />
          
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" >
            Register
          </Button>
        </Form.Item>
      </Form>
  
    </div>
  )
}

export default Register






