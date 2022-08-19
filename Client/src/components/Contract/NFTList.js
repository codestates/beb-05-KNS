import React from 'react';
import NFTSlot from './NFTSlot';
import { Col, Row, Divider } from 'antd';

const NFTList = () => {
    const style = {
        background: '#ffffff',
        padding: '2px 0',
      };

    return (
    <div>
        
        <Divider orientation="left">Responsive</Divider>
        <Row>
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

export default NFTList;