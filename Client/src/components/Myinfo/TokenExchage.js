import React, {useState, useEffect} from 'react';
import { Button, Form, Input, message, Space } from 'antd';
import MyNFT from './MyNFT';
import { sendToken } from '../../APIs/contract';
import { myInfo, getUserId } from '../../APIs/auth';

const TokenExchage = () => {

  const [userInfo,setUserInfo] = useState({});
  const [userId,setUserId] = useState("");
  const [tokenAmount,setTokenAmount] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () =>{
    let userId;

    await getUserId()
        .then((res) => {    
            let userInfo = res.data.data.userInfo;
            userId = userInfo.id;
        })
        .catch((err) => {
          if (err) {
              console.log(err.response.data.message);
          }
      });

    const { data: {data : {userName,address,tokenAmount,ethAmount,createdAt}}} = await myInfo(userId); //API 호출
    setUserInfo({userName,address,tokenAmount,ethAmount,createdAt}); 
    setUserId(userId);
  }

  console.log(userId);
  const myTk = "보유토큰 :"+userInfo.tokenAmount+"개";
  const [form] = Form.useForm();

  const onFinish = (msg='Submit success!') => {
    message.success(msg);
  };
  const onFinishFailed = (msg='Submit failed!') => {
    message.error(msg);
  };
  const onFill = () => {
    form.setFieldsValue({
      address: '0xb9B074BDdF7931dD72dcDc1A173601cA4448553B',
    });
  };

  const [inputData, setInput] = useState({
    targetId: "",
    tAmount: 0,
  });
  const setMintData = (name, value) => {
      setInput({
          ...inputData,
          [name]: value,
      });  
  }

  const onChange = (e) => {
      setMintData(e.target.name, e.target.value);
  };

  const sendTok = async ()=>{
    if(!(inputData.targetId&& inputData.tAmount>0)){
      (inputData.targetId === "")&&onFinishFailed('받을사람 주소를 입력하세요.');
      (inputData.tAmount === 0)&&onFinishFailed('보낼 토큰의 수를 입력하세요.');
      return;
    } 
    //토큰 전송
    const res = await sendToken(userId, inputData.targetId, inputData.tAmount);

    //보유토큰 업데이트
    
    await getUserId()
        .then((res) => {    
            let userInfo = res.data.data.userInfo;
            setUserId(userInfo.id);
        })
        .catch((err) => {
          if (err) {
              console.log(err.response.data.message);
          }
      });

    const { data: {data : {userName,address,tokenAmount,ethAmount,createdAt}}} = await myInfo(userId); //API 호출
    setUserInfo({userName,address,tokenAmount,ethAmount,createdAt}); 
    //setUserId(userId);
    //myTk = "보유토큰 :"+userInfo.tokenAmount+"개";

    onFinish('전송에 성공하였습니다.');
  }

    return (
    <Form
      form={form}
      layout="vertical"
      onFinish={sendTok}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
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
        <Input placeholder="받을사람의 지갑주소"  Name='targetId' onChange={onChange}/>
      </Form.Item>
      <Form.Item><Input placeholder="토큰 수량"  Name='tAmount' onChange={onChange}/></Form.Item>
      <Form.Item
        label={userInfo.tokenAmount}
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
            토큰전송
          </Button>
          <Button htmlType="button" onClick={onFill}>
            테스트주소입력
          </Button>
        </Space>
      </Form.Item>
      <MyNFT/>
    </Form>    
    )
};

export default TokenExchage;
