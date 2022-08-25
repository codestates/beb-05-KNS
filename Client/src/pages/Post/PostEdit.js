import React, {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {Input, TextArea, Button} from "semantic-ui-react";
import {getPostDetail, modifiedPost} from '../../APIs/post' //API

export default function PostEdit() {

    const [postContent, setPostContent] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const {id} = useParams();
    const navigate = useNavigate();

    const getView = async () => {

        await getPostDetail(id)
            .then((res) => {
                const postData = res.data.data;
                setPostContent(postData);
                setTitle(postData.title);
                setContent(postData.content);
        });
    };

    useEffect(() => {
        getView();
    }, []);

    const updatePost = async () => {

        const userId = 1; // 임시 사용자 아이디 변수

        const data = {
            userId: userId,
            title: title,
            content: content,
            img: ""
        };

        await modifiedPost(data, id)
            .then((res) => {
                console.log(res);
                navigate(`/PostView/${id}`);
            })
            .catch((err) => {
                if (err) {
                    alert(err.response.data.message);
                }
            });
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
                                        value={title}
                                        onChange={event => {
                                            setTitle(event.target.value);

                                        }}></Input>
                                </dd>
                            </dl>
                        </div>
                        <div className="cont">
                            <TextArea
                                type='text'
                                value={content}
                                onChange={event => {
                                    setContent(event.target.value);

                                }}
                                placeholder="내용 입력"></TextArea>
                        </div>
                    </div>

                    <div className="bt_wrap">
                        <Button
                            className="button on"
                            size="big"
                            content="수정"
                            onClick={updatePost}/> 
                            {/* 내용 수정하고 해당 게시물 뷰로 이동 */}
                        <Link to={`/PostView/${id}`}>취소</Link>
                        {/* 해당 게시물 뷰로 이동 */}
                    </div>
                </div>
            </div>
        </div>
    );
}
