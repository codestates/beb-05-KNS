import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import {getCommentList, writeReply} from '../../../APIs/post' //API

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? '개의 댓글이 있습니다.' : '개의 댓글이 있습니다.'}`}
    itemLayout="horizontal"
   
    renderItem={(item) => (
      <li>
        <Comment
          actions={item.actions}
          author={item.userName}
          avatar={'https://joeschmoe.io/api/v1/random'}
          content={item.content}
          datetime={item.createdAt.substr(0,10)}
        />
      </li>
    )}
    //renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        댓글 등록
      </Button>
    </Form.Item>
  </>
);

const App = ({id, reqUserName}) => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');

  const getComment = async () => {
    await getCommentList(id)
            .then((res) => {
              const commentData = res.data.commentData;
              //console.log(commentData);
              setComments(commentData);
        });
  };
  
  useEffect(() => {
    getComment();
  }, []);

  const handleSubmit = async () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments([
        ...comments,
        {
          userName: reqUserName,
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p>{value}</p>,
          createdAt: moment().fromNow(),
        },
      ]);
    }, 1000);

    const data = {
      content: value,
    };

    await writeReply(data, id)
    .then((res) => {
        //console.log(res);
    })
    .catch((err) => {
        if (err) {
            alert(err.response.data.message);
        }
    });

  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ width: "100%"}}>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </div>
  );
};

export default App;