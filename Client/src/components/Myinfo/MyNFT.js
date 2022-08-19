import React from 'react';
import NFTSlot from '../Contract/NFTSlot';
import { Col, Row, Divider } from 'antd';

const MyNFT = () => {
    const style = {
        background: '#0092ff',
        padding: '8px 0',
      };

    return (
    <div>
        구입한 NFT 목록<br />
        <Divider orientation="left">Responsive</Divider>
        <Row
        gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
        }}
        >
        <Col className="gutter-row" span={6}>
            <div style={style}><NFTSlot /></div>
        </Col>
        <Col className="gutter-row" span={6}>
            <div style={style}><NFTSlot /></div>
        </Col>
        <Col className="gutter-row" span={6}>
            <div style={style}><NFTSlot /></div>
        </Col>
        <Col className="gutter-row" span={6}>
            <div style={style}><NFTSlot /></div>
        </Col>
        <Col className="gutter-row" span={6}>
            <div style={style}><NFTSlot /></div>
        </Col>
        <Col className="gutter-row" span={6}>
            <div style={style}><NFTSlot /></div>
        </Col>
        </Row>
        
    </div>
    )
};

export default MyNFT;