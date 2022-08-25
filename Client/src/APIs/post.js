import { Axios } from './auth';
import {getHeaders} from './token';

const API_URL = process.env.REACT_APP_SERVER_URL;

//POST /post 게시글 작성
export const writePost = async (data) => {
    console.log(getHeaders());
    return await Axios.post(`${API_URL}/post`, 
        {
            title: data.title,
            content: data.content,
            img: data.img,
        },
        {
            headers: getHeaders()
        }       
    );
};

//GET /post 게시글 조회
export const getPostList = async () => {
    return await Axios.get(`${API_URL}/post`);
};

//PUT /post/{postId} 게시글 수정
//PRAM title, content, img
export const modifiedPost = async (data,postId) => {
    return await Axios.put(`${API_URL}/post/${postId}`, 
        {
            title: data.title,
            content: data.content,
            img: data.img,
        },
        {
            headers: getHeaders()
        }  
    );
};

//DELETE /post/{postId} 게시글 삭제
export const deletePost = async (postId) => {
    return await Axios.delete(`${API_URL}/post/${postId}`,
        {
            headers: getHeaders()
        } 
    );
};

//PUT /post/like/{postId} 게시글 좋아요 업데이트
export const likePost = async (postId) => {
    return await Axios.put(`${API_URL}/post/like/${postId}`);
};

//POST /post/{postId}/comment 게시글 댓글 작성
//PRAM postId, userId, userName, comment
export const writeReply = async (data,postId) => {
    return await Axios.post(`${API_URL}/post/${postId}/comment`, 
        {
            userId: data.userId,
            content: data.content,
        },
        {
            headers: getHeaders()
        }  
    );
};

//PUT /post/comment/{commentId} 게시글 댓글 수정
export const modifiedReply = async (data,commentId) => {
    return await Axios.put(`${API_URL}/post/comment/${commentId}`, 
        {
            content: data.content,
        },
        {
            headers: getHeaders()
        }  
    );
};  

//DELETE /post/comment/{commentId} 게시글 댓글 삭제
export const deleteReply = async (commentId) => {
    return await Axios.delete(`${API_URL}/post/comment/${commentId}`,
        {
            headers: getHeaders()
        } 
    );
};

//GET /post/{postId}/comment 게시글 댓글 조회
export const getCommentList = async (postId) => {
    return await Axios.get(`${API_URL}/post/${postId}/comment`);
};

//----------MY PAGE 노출용 POST 정보 -------------------------
//GET /post/${postId} 게시글 상세 조회
export const getPostDetail = async (postId) => {
    return await Axios.get(`${API_URL}/post/${postId}`,
        {
            headers: getHeaders()
        } 
    );
};
//GET /post/${userId} 내 게시글 조회
export const getMyPostList = async (userId) => {
    return await Axios.get(`${API_URL}/user/${userId}/post`,
        {
            headers: getHeaders()
        } 
    );
};


