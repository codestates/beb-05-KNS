

import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Input, TextArea, Button} from "semantic-ui-react";
import {writePost} from '../../APIs/post' //API
import { create } from "ipfs-http-client";

export default function PostWrite( ) {

  const [fileUrl, updateFileUrl] = useState(``);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  //const [isWantImage, setIsWantImage] = useState(false);

  const registerPost = async () => {
    
    const userId = 1; // 임시 사용자 아이디 변수
    
    const data = {
        userId: userId,
        title: title,
        content: content,
        img: fileUrl,
    };

  await writePost(data)
    .then((res) => {
        console.log(res);
        navigate(`/`);
    })
    .catch((err) => {
        if (err) {
            alert(err.response.data.message);
        }
    });
  };

  useEffect(() => {
    
  }, []);

  const client = create("https://ipfs.infura.io:5001/api/v0");
  console.log(fileUrl);
  console.log(image);

  const onChange = async (e) => {
    const file = e.target.files[0];
    console.log(e.target.files);
    console.log(file);

    setImage(URL.createObjectURL(file));
    try {
      const added = await client.add(file);
      console.log(URL.createObjectURL(file));
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  return (
    <div className="board_wrap">
            <div className="board_title">
                <h2>커뮤니티</h2>
                <p>토큰 및 NFT 정보를 올리고 토큰을 받으세요!</p>
            </div>
            <div>
                <div className="board_write_wrap">
                    <div className="board_write">
                        <div className="title">
                            <dl>
                                <dt>제목</dt>
                                <dd>
                                    <Input
                                        type='text'
                                        name='title'
                                        onChange={event => {
                                            setTitle(event.target.value);                        
                                        }}
                                        placeholder="제목을 입력해주세요."></Input>
                                </dd>
                            </dl>
                        </div>
                        <div className="cont">
                            <TextArea
                                type='text'
                                name='content'
                                onChange={event => {
                                    setContent(event.target.value);
                                }}
                                placeholder="내용을 입력해주세요."></TextArea>
                        </div>
                    </div>
                    
                    <div className="bt_wrap">
                        <Button
                            className="button on"
                            size="big"
                            content="등록"
                            onClick={registerPost}/> 
                            {/* 내용 등록하고 목록으로 이동 */}
                        <Link to={`/`}>목록</Link>
                        {/* 해당 게시물 뷰로 이동 */}
                    </div>
        </div>
      </div>
    </div>
  );
}