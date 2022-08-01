/* eslint-disable */
import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import { loginUser } from '../../_actions/user_actions';
import { useDispatch } from 'react-redux';

function LoginPage(props) {
  let dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    let email = values.email;
    let password = values.password;
    let data = {
      email,
      password
    }

    dispatch(loginUser(data)).then(res => {
      if (res.payload.loginSuccess) {
        window.localStorage.setItem('userId', res.payload.userId);
        message.success('로그인 되었습니다.', 1)
        props.navigate('/')
      } else {
        form.setFieldsValue({
          email: '',
          password: '',
        });
        message.error(res.payload.message, 1);
      }
    });

  };


  return (
    <div className='login-body'>
      <Form
        form={form}
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
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" >
            Login
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default LoginPage