import React from 'react';
import PLItem from './card'
import { Pagination,Space } from 'antd';

const POSTList = () => {
    return (
    <div>
    <Space size={30}>
        <PLItem />
        <PLItem />
        <PLItem />
        <PLItem />
    </Space>
    <Space size={30}>
        <PLItem />
        <PLItem />
        <PLItem />
        <PLItem />
    </Space>
        <Pagination defaultCurrent={1} total={50} />
    </div>
    )
};

export default POSTList;