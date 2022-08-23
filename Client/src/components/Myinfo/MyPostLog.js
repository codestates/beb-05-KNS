import { Space, Table, Tag } from 'antd';
import React from 'react';
import POSTDelete from '../../components/POST/Delete'
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: '1',
    Name: 'John',
    Date: '11:23:23',
    Title: 'NFT마켓 뉴스',
    Desc: '오픈씨 클론 오픈씨 클론 오픈씨 <br/>클론 오픈씨 클론 오픈씨 클론  ',
    tags: ['news', 'NFT'],
  },
  {
    key: '2',
    Name: 'John',
    Date: '11:23:23',
    Title: 'NFT마켓 뉴스',
    Desc: '오픈씨 클론 오픈씨 클론 오픈씨 <br/>클론 오픈씨 클론 오픈씨 클론  ',
    tags: ['news', 'NFT'],
  },
  {
    key: '3',
    Name: 'John',
    Date: '11:23:23',
    Title: 'NFT마켓 뉴스',
    Desc: '오픈씨 클론 오픈씨 클론 오픈씨 <br/>클론 오픈씨 클론 오픈씨 클론  ',
    tags: ['news', 'NFT'],
  },
];

const MyPostLog = () => (
  <Table dataSource={data}>
    <ColumnGroup title="Name">
      <Column title="Name" dataIndex="Name" key="Date" />
      <Column title="Title" dataIndex="Title" key="Title" />
    </ColumnGroup>
    <Column title="Desc" dataIndex="Desc" key="Desc" />
    <Column title="Date" dataIndex="Date" key="Date" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space size="middle">
          <POSTDelete />        
        </Space>
      )}
    />
  </Table>
);

export default MyPostLog;