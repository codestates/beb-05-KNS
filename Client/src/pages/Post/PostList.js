import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./PostStyle.css";
import {getPostList} from '../../APIs/post' //API
import {usePostList} from '../../utils/Hooks'; // State Hooks

export default function PostList() {

    //const [isLoading, isSetLoading] = useState(true);
    /* const [postList, setPostList] = usePostList(
        (state) => [state.postList, state.setPostList]
    ); //Hooks 불러오기 */
    const [postList, setPostList] = useState([]);
    
    useEffect(() => {
       getPostList()
        .then((res) => {
            const postData = jsonToArray(res.data.data);
            setPostList(postData);
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            }
        });
        
    }, []);

    //json 다중 객체를 배열로 변환
    function jsonToArray(json) {
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function (key) {
            result.push(json[key]);
        });
        return result;
    }

    return (
        <div className="board_wrap">
            <div className="board_title">
                <h2>커뮤니티</h2>
                <p>토큰 및 NFT 정보를 올리고 토큰을 받으세요!</p>
                <div className="bt_wrap">
                    <Link to="/PostWrite" className="on">
                        등록
                    </Link>
            
                </div>
            </div>
            <div>
                <div className="board_list_wrap">
                    <div className="board_list">
                        <div className="top">
                            <div className="num">번호</div>
                            <div className="writer">작성자</div>
                            <div className="post_title">제목</div>                            
                            <div className="date">등록일</div>
                            <div className="view">추천수</div>
                            <div className="view">조회수</div>
                        </div>
                        {
                            postList.map((post) => (
                                <div key={post.id}>
                                    <div className="num">{post.id}</div>
                                    <div className="writer">{post.userName}</div>
                                    <div className="post_title">
                                        <Link to={`/PostView/${post.id}`}>{post.title}</Link>
                                        {/* "/PostView/:postId" */}
                                        <span>[{post.commentsCount}]</span>
                                    </div>                          
                                    <div className="date">{post.createdAt.substr(0,10)}</div>
                                    <div className="view">{post.like}</div>
                                    <div className="view">{post.hit}</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="board_page">
                        <a href="#" className="bt prev">
                            ◁
                        </a>
                        <a href="#" className="num on">
                            1
                        </a>
                        <a href="#" className="num">
                            2
                        </a>
                        <a href="#" className="num">
                            3
                        </a>
                        <a href="#" className="num">
                            4
                        </a>
                        <a href="#" className="num">
                            5
                        </a>
                        <a href="#" className="bt next">
                            ▷
                        </a>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
