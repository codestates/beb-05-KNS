import React from 'react';
import { Tabs, Layout } from 'antd';

import  NFTList  from '../../components/Contract/NFTList';
import  MyPostLog  from '../../components/Myinfo/MyPostLog';
import  TokenExchage  from '../../components/Myinfo/TokenExchage';
import  Myinfo  from '../../components/Myinfo';
import  TokenMint  from '../../components/Contract/NFTMint';

const { TabPane } = Tabs;
const myPage = () => {
    return (
        <Layout 
        className="site-layout-background"
        style={{
            padding: '24px 0',
            background: '#fff'
        }}>
        <div>
            <Tabs
            defaultActiveKey="1"
            tabPosition={'left'}
            >
                <TabPane tab={`내정보`} key='0'>
                <Myinfo />
                </TabPane>
                <TabPane tab={`내가쓴글`} key='1'>
                <MyPostLog />
                </TabPane>
                <TabPane  tab={`토큰교환&보유`} key='2'>
                <TokenExchage />
                </TabPane>
                <TabPane  tab={`NFT상점`} key='3'>
                <NFTList />
                </TabPane>
                <TabPane  tab={`NFT발행`} key='4' disabled='true'>                
                </TabPane>
                <TabPane  tab={`NFT발행(임시)`} key='5'>
                <TokenMint />
                </TabPane>
            </Tabs>
        </div>
        </Layout>
    )
};

export default myPage;