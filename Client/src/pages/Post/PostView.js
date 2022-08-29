import React, {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {Button} from "semantic-ui-react";
import {getPostDetail, deletePost, likePost} from '../../APIs/post' //API
import Comment from "../../components/POST/Comment/index";

export default function PostView() {
    const [postContent, setPostContent] = useState([]);

    const {id} = useParams();
    const navigate = useNavigate();

    const getView = async () => {

        await getPostDetail(id)
            .then((res) => {
                const postData = res.data.data;
                setPostContent(postData);
        });
    };

    useEffect(() => {
        getView();
    }, []);

    const deleteView = async () => {

        await deletePost(id)
            .then((res) => {
                console.log(res);
                alert("삭제하였습니다.");
                navigate(`/POSTList`);
            })
            .catch((err) => {
                if (err) {
                    alert(err.response.data.message);
                }
            });
    };

    const likeView = async () => {

        await likePost(id)
            .then((res) => {
                console.log(res);
                alert("추천하였습니다.");
                navigate(`/POSTList`);
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
            </div>
            <div className="bt_wrap">
                <Link to="/POSTList">
                    목록
                </Link>
                <Button
                    className="button"
                    size="big"
                    content="추천"
                    onClick={likeView}/>

                <Link to={`/PostEdit/${id}`} className="on">수정</Link>
                <Button
                    className="button on"
                    size="big"
                    content="삭제"
                    onClick={deleteView}/>
            </div>

            <div>
                <div className="board_view_wrap">
                    <div className="board_view">
                        <div className="title">{postContent.title}</div>
                        <div className="info">
                            <dl>
                                <dt>번호</dt>
                                <dd>{postContent.id}</dd>
                            </dl>
                            <dl>
                                <dt>작성자</dt>
                                <dd>{postContent.userName}</dd>
                            </dl>
                            <dl>
                                <dt>등록일</dt>
                                <dd>{postContent.createdAt}</dd>
                            </dl>
                            <dl>
                                <dt>조회수</dt>
                                <dd>{postContent.hit}</dd>
                            </dl>
                            <dl>
                                <dt>추천수</dt>
                                <dd>{postContent.like}</dd>
                            </dl>
                        </div>
                        <div className="cont">{postContent.content}</div>
                    </div>
                    <div>
                        {<Comment  id = {id}
                                   reqUserName = {postContent.reqUserName}/>}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
