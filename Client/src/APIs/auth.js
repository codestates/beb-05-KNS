import axios from 'axios';
import {getHeaders} from './token';

const API_URL = process.env.REACT_APP_SERVER_URL;

//POST /signup 회원가입
//PRAM username, password, address, tokenAmount, ethAmount, mnemonic, privateKey

export const join = async (username, password) => {
    return await axios.post(`${API_URL}/signup`, {

        username,
        password,
    });
};

//POST /auth/login 로그인
export const login = async (userName, password) => {
    const data = await Axios.post(`${API_URL}/login`, {
        userName,
        password,
    });
    // console.log(data);   
    return data;
};

//GET /logout 로그아웃
export const logout = () => {
    //토큰 삭제하면 될듯. 호출한 곳에서 로그아웃&페이지 이동처리
    localStorage.removeItem('token');    
};

//GET /auth/{userID} 회원정보 조회
export const myInfo = async (userID) => {
    return await Axios.get(`${API_URL}/user/${userID}`);    
};

export const authHeader = () => {
    const user = localStorage.getItem("user");

    if (user && user.accessToken) {
        return { "access-token": user.accessToken };
    } else {    
        return {};
    }
};

export const Axios = axios.create({
    headers: authHeader(),
});

//사용자 아이디 가져오는 함수
export const getUserId = async () => {
    return await Axios.get(`${API_URL}/userId`, 
        {
            headers: getHeaders()
        }       
    );
};

//사용자 아이디 가져오는 함수
export const faucet = async (userId) => {
    return await Axios.put(`${API_URL}/user/${userId}/faucet`, 
        {
            headers: getHeaders(),
        }       
    );
};

/* //POST /auth/{addr} 무료로 이더 받기(faucet)
export const faucet = async (addr) => {
    return await Axios.post(`${API_URL}/user/${addr}`);
} */