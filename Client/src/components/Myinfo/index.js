import React from 'react';
import { Badge, Descriptions } from 'antd';

const MyInfo = () => {
    return (
    <div>
        <Descriptions title="User Info" layout="vertical" bordered>
        <Descriptions.Item label="이름">NFT Maker</Descriptions.Item>
        <Descriptions.Item label="성별">나</Descriptions.Item>
        <Descriptions.Item label="정보공개">YES</Descriptions.Item>
        <Descriptions.Item label="가입">2022-04-24 18:00:00</Descriptions.Item>
        <Descriptions.Item label="최종접속" span={2}>
            2022-08-14 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
            <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="토큰 보유량">790</Descriptions.Item>
        <Descriptions.Item label="NFT보유수">12개</Descriptions.Item>
        <Descriptions.Item label="누적토큰">1600</Descriptions.Item>
        <Descriptions.Item label="자기소개">
            HI!
            <br />
            휴!
            <br />
            HI!
            <br />
            HI!
            <br />
            HI!
            <br />
            휴!<br />
        </Descriptions.Item>
        </Descriptions>
    </div>
    )
};

export default MyInfo;

