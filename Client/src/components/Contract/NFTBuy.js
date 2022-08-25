import { Button, Modal, message } from 'antd';
import React, { useState } from 'react';
import { buyNFT } from '../../APIs/contract';

const NFTBuy = ({image, tokenId}) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('현재 NFT를 구매하시겠습니까?');
  
    const showModal = () => {
      setVisible(true);
    };

    const Reset = () => {
      setVisible(false);
      setConfirmLoading(false);
      setModalText('현재 NFT를 구매하시겠습니까?');
    }
  
    const handleOk = () => {
      setModalText('구매 진행중... 잠시 기다려주세요.');
      setConfirmLoading(true);
      sendMsgBuy();
      setTimeout(() => { 
        Reset();
        message.success('구매에 성공했습니다.');
      }, 3000);
    };
  
    const handleCancel = () => {
      message.error('거래가 취소되었습니다.');
      setVisible(false);
    };

    const sendMsgBuy = async () => {
      const res = await buyNFT(tokenId);
      console.log("tokenId",tokenId,res);
    }

    return (
    <>
      <Button type="primary" ghost style={{width: '100%', justifyContent: 'right'}}
      onClick={showModal}>        
        NFTBuy
      </Button>
      <Modal
        title="NFT구매창"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{confirmLoading?null:<img alt='NFT' src={image} />}{modalText}</p>
      </Modal>
    </>
    )
};

export default NFTBuy;
