import React from 'react';
import { Card,Button }  from 'antd';
import nftimg from '../../assets/nftimg.png';
import NFTBuy from './NFTBuy';

const { Meta } = Card;

const NFTSlot = () => {
    return (  
    <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt="example" src={nftimg} />}
      >
        <Meta title="NFT #23" description="프로필 배경으로 활용 가능한 NFT 입니다" /><br />
        <NFTBuy style={{justifyContent: 'right'}} />
        {/* <Button type="primary" ghost style={{width: '100%', justifyContent: 'right'}}>구매</Button> */}
      </Card>
    )
};

export default NFTSlot;