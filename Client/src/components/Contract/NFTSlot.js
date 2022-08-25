import React from 'react';
import { Card }  from 'antd';
import NFTBuy from './NFTBuy';

const { Meta } = Card;

const NFTSlot = ({isBuy, NftList}) => {
    console.log(NftList);
    return (  
      <Card hoverable style={{ width: 240 }} cover={<img alt={NftList?.tokenName} src={NftList?.img} />}>
        <Meta title={NftList?.tokenName} description={NftList?.desc} /><br />
        {isBuy?(
          <NFTBuy style={{justifyContent: 'right'}} image={NftList?.img} tokenId={NftList?.tokenId}/>):''}
          <div>TID:{NftList?.tokenId}</div>
      </Card>
    )
};

export default NFTSlot;