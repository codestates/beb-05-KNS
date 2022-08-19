import { Axios } from './user';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const getPostList = async () => {
    return await Axios.get(`${API_URL}/post`);
};

export const writePost = async (data) => {
    return await Axios.post(`${API_URL}/post/create`, {
        data,
    });
};

export const modifiedPost = async (data) => {
    return await Axios.post(`${API_URL}/post/modified`, {
        data,
    });
};

export const addLike = async (postidx) => {
    return await Axios.post(`${API_URL}/post/addlike`, {
        idx: postidx,
    });
};

export const getCommentList = async (postidx) => {
    return await Axios.get(`${API_URL}/comment`, {
        idx: postidx,
    });
};

export const writeReply = async (data) => {
    return await Axios.post(`${API_URL}/comment/create`, {
        data,
    });
};

export const modifiedReply = async (data) => {
    return await Axios.post(`${API_URL}/comment/modified`, {
        data,
    });
};  

export const deleteReply = async (data) => {
    return await Axios.post(`${API_URL}/comment/delete`, {
        data,
    });
};

