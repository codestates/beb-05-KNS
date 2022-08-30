import React, {useState, useEffect} from 'react';
import { Button, Form, Input, message, Space } from 'antd';
import MyNFT from './MyNFT';
import { sendToken } from '../../APIs/contract';
import { myInfo, getUserId, faucet } from '../../APIs/auth';

const TokenExchage = () => {

  const [userInfo,setUserInfo] = useState({});
  const [userId,setUserId] = useState("");
  const [tokenAmount,setTokenAmount] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUser();
  }, [userId]);
  
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
      console.log("gogo = " + userId);
    const { data: {data : {userName,address,tokenAmount,ethAmount,createdAt}}} = await myInfo(userId); //API 호출
    setUserInfo({userName,address,tokenAmount,ethAmount,createdAt}); 
    setUserId(userId);
  }

  const [form] = Form.useForm();

  const onFinish = (msg='Submit success!') => {
    message.success(msg);
  };
  const onFinishFailed = (msg='Submit failed!') => {
    message.error(msg);
  };
  const getEth = async () => {
  
    await faucet(userId)
        .then((res) => {    
            console.log(res.data);
        })
        .catch((err) => {
          if (err) {
              console.log(err.response.data.message);
          }
      });
    
    /* form.setFieldsValue({
      address: '0xb9B074BDdF7931dD72dcDc1A173601cA4448553B',
    }); */
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
    await sendToken(userId, inputData.targetId, inputData.tAmount)
      .then((res) => {
        console.log(res);
        //보유토큰 업데이트
        onFinish('전송에 성공하였습니다.');
        
        getUser();
      })
      .catch((err) => {
          if (err) {
              onFinishFailed(err.response.data.message);
              //alert(err.response.data.message);
          }
      });

    
    //setUserId(userId);
    //myTk = "보유토큰 :"+userInfo.tokenAmount+"개";

     
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

        label={"보유토큰 :" + userInfo.tokenAmount + "개 / "+ 
               "보유이더 :" + userInfo.ethAmount + "개 "}
        
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
          <Button htmlType="button" onClick={getEth}>
            이더받기(최초 토큰 전송시 필수)
          </Button>
          <Button type="primary" htmlType="submit">
            토큰전송
          </Button>
        </Space>
      </Form.Item>
      <MyNFT/>
    </Form>    
    )
};

export default TokenExchage;
