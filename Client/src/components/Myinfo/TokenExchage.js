import React from 'react';
import { Button, Form, Input, message, Space } from 'antd';
import MyNFT from './MyNFT';

const TokenExchage = () => {
  const haveToken = 15;
  const myTk = "보유토큰 :"+haveToken+"개";
  const [form] = Form.useForm();
  const onFinish = () => {
    message.success('Submit success!');
  };
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  const onFill = () => {
    form.setFieldsValue({
      address: '0xb9B074BDdF7931dD72dcDc1A173601cA4448553B',
    });
  };

    return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="address"
        label="받을사람 지갑주소"
        rules={[
          {
            required: true,
          },
          {
            type: 'address',
            warningOnly: true,
          },
          {
            type: 'string',
            min: 6,
          },
        ]}
      >
        <Input placeholder="받을사람의 지갑주소" />
      </Form.Item>
      <Form.Item><Input placeholder="토큰 수량" /></Form.Item>
      <Form.Item
        name="token"
        label={myTk}
        rules={[
          {
            required: true,
          },
          {
            type: 'token',
            warningOnly: true,
          },
          {
            type: 'string',
            min: 6,
          },
        ]}
      ></Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onFill}>
            Fill
          </Button>
        </Space>
      </Form.Item>
      <MyNFT />
    </Form>    
    )
};

export default TokenExchage;
