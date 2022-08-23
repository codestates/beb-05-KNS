import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import CommentList from './Comment'

const POST = () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <Modal
          title="Modal 1000px width"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1000}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
          <CommentList />
        </Modal>
      </>
    );
  };
  
export default POST;