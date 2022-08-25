import React, {useEffect,useState} from 'react';
import { Badge, Descriptions } from 'antd';
import { myInfo } from '../../APIs/auth';
import { useUserInfo } from '../../utils/Hooks'

const MyInfo = () => {    
    //const [userInfo, setUserInfo] = useUserInfo((state) => [state.userInfo, state.setUserInfo]); //Hooks 불러오기
    const [userInfo,setUserInfo] = useState({});
    const getUser = async () =>{
        console.log("getuser");
        const { data: {data : {userName,address,tokenAmount,ethAmount,createdAt}}} = await myInfo(1); //API 호출
        setUserInfo({userName,address,tokenAmount,ethAmount,createdAt});        
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
    <div>
        {console.log('user',(userInfo)?userInfo.userName:'nohave',userInfo )}
        <Descriptions title="User Info" layout="vertical" bordered>
        <Descriptions.Item label="이름">{userInfo?.userName}</Descriptions.Item>
        <Descriptions.Item label="정보공개">{userInfo?.address}</Descriptions.Item>
        <Descriptions.Item label="가입일">{userInfo?.createdAt}</Descriptions.Item>
        <Descriptions.Item label="최종접속">{userInfo?.createdAt}</Descriptions.Item>
        <Descriptions.Item label="Status">
            <Badge status="processing" text="접속중" />
        </Descriptions.Item>
        <Descriptions.Item label="토큰 보유량">{userInfo?.tokenAmount}</Descriptions.Item>
        <Descriptions.Item label="NFT보유수">{userInfo?.ethAmount}</Descriptions.Item>
        <Descriptions.Item label="etc">---내 소개를 작성해 보세요---</Descriptions.Item>
        </Descriptions>
    </div>
    )
};

export default MyInfo;

